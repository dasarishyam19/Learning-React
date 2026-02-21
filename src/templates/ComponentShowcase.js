import React, { useState } from 'react';
import Text from '../components/atoms/Text/Text';
import Button from '../components/atoms/Button/Button';
import FormField from '../components/molecules/FormField/FormField';
import { Card } from '../components/organisms/Card/Card';
import { Modal } from '../components/organisms/Modal/Modal';
import { Tabs } from '../components/Compound/Tabs/Tabs';
import { Accordion } from '../components/Compound/Accordion/Accordion';
import { useDisclosure } from '../hooks/useDisclosure';

export default function ComponentShowcase() {
    const { isOpen, open, close } = useDisclosure();
    const [formData, setFormData] = useState({ username: '', error: '' });

    const handleSimulateError = () => {
        setFormData({ ...formData, error: 'Username is already taken' });
    };

    return (
        <div style={{ padding: 'var(--spacing-8)', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-10)' }}>
            <header>
                <Text as="h1" variant="h1" color="primary">UI Component Showcase</Text>
                <Text variant="body" color="muted">Demonstrating atomic design and compound components architecture.</Text>
            </header>

            {/* Atoms */}
            <section>
                <Text as="h2" variant="h2" style={{ marginBottom: 'var(--spacing-4)' }}>Atoms</Text>
                <Card>
                    <Card.Body style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="ghost">Ghost</Button>
                    </Card.Body>
                </Card>
            </section>

            {/* Molecules */}
            <section>
                <Text as="h2" variant="h2" style={{ marginBottom: 'var(--spacing-4)' }}>Molecules</Text>
                <Card>
                    <Card.Body>
                        <FormField
                            label="Username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={(e) => setFormData({ username: e.target.value, error: '' })}
                            error={formData.error}
                        />
                        <Button variant="secondary" size="sm" onClick={handleSimulateError}>
                            Simulate Error
                        </Button>
                    </Card.Body>
                </Card>
            </section>

            {/* Organisms - Modal */}
            <section>
                <Text as="h2" variant="h2" style={{ marginBottom: 'var(--spacing-4)' }}>Organisms (Modal)</Text>
                <Button onClick={open}>Open Modal</Button>

                <Modal isOpen={isOpen} onClose={close}>
                    <Modal.Header>
                        <Text as="h3" variant="h2">Delete Confirmation</Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={close}>Cancel</Button>
                        <Button variant="danger" onClick={close}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </section>

            {/* Compound Components */}
            <section>
                <Text as="h2" variant="h2" style={{ marginBottom: 'var(--spacing-4)' }}>Compound Components (Tabs & Accordion)</Text>

                <Tabs defaultIndex={0} style={{ marginBottom: 'var(--spacing-6)' }}>
                    <Tabs.List>
                        <Tabs.Tab>Profile</Tabs.Tab>
                        <Tabs.Tab>Settings</Tabs.Tab>
                        <Tabs.Tab>Billing</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panels>
                        <Tabs.Panel>
                            <Text>Profile settings and information go here.</Text>
                        </Tabs.Panel>
                        <Tabs.Panel>
                            <Text>Configure your preferences.</Text>
                        </Tabs.Panel>
                        <Tabs.Panel>
                            <Text>Billing history and payment methods.</Text>
                        </Tabs.Panel>
                    </Tabs.Panels>
                </Tabs>

                <Accordion allowMultiple>
                    <Accordion.Item>
                        <Accordion.Header>What is Atomic Design?</Accordion.Header>
                        <Accordion.Panel>Atomic design is methodology for creating design systems directly modeled after nature's creation of matter.</Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>Why Compound Components?</Accordion.Header>
                        <Accordion.Panel>Compound components allow for maximum flexibility without prop drilling, following the Open/Closed Principle.</Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </section>
        </div>
    );
}
