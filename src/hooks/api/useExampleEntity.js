import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api/apiService';

/**
 * React Query Keys structure
 */
export const exampleKeys = {
    all: ['exampleEntities'],
    detail: (id) => ['exampleEntities', id],
};

// --- API Calls ---

const fetchEntities = async () => {
    return await apiService.get('/entities');
};

const fetchEntityById = async (id) => {
    return await apiService.get(`/entities/${id}`);
};

const createEntity = async (newEntity) => {
    return await apiService.post('/entities', newEntity);
};

const updateEntity = async ({ id, ...data }) => {
    return await apiService.put(`/entities/${id}`, data);
};

const deleteEntity = async (id) => {
    return await apiService.delete(`/entities/${id}`);
};

// --- Custom Hooks ---

export const useExampleEntities = () => {
    return useQuery({
        queryKey: exampleKeys.all,
        queryFn: fetchEntities,
    });
};

export const useExampleEntity = (id) => {
    return useQuery({
        queryKey: exampleKeys.detail(id),
        queryFn: () => fetchEntityById(id),
        enabled: !!id, // Only fetch if ID exists
    });
};

export const useCreateExampleEntity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEntity,
        onSuccess: () => {
            // Invalidate the list so it refetches and shows the new entity
            queryClient.invalidateQueries({ queryKey: exampleKeys.all });
        },
    });
};

export const useUpdateExampleEntity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateEntity,
        onSuccess: (data, variables) => {
            // Invalidate both the list and the specific detail query
            queryClient.invalidateQueries({ queryKey: exampleKeys.all });
            queryClient.invalidateQueries({ queryKey: exampleKeys.detail(variables.id) });
        },
    });
};

export const useDeleteExampleEntity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteEntity,
        onSuccess: () => {
            // Refresh the list after deletion
            queryClient.invalidateQueries({ queryKey: exampleKeys.all });
        },
    });
};
