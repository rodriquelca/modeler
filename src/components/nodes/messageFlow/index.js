import component from './messageFlow.vue';

export const id = 'processmaker-modeler-message-flow';

export default {
  id,
  component,
  bpmnType: 'bpmn:MessageFlow',
  control: false,
  definition(moddle) {
    return moddle.create('bpmn:MessageFlow', { name: '' });
  },
  inspectorConfig: [
    {
      name: 'Message Flow',
      items: [
        {
          component: 'FormText',
          config: {
            label: 'Message Flow',
            fontSize: '2em',
          },
        },
        {
          component: 'FormInput',
          config: {
            label: 'Identifier',
            helper: 'The id field should be unique across all elements in the diagram',
            name: 'id',
          },
        },
        {
          component: 'FormInput',
          config: {
            label: 'Name',
            helper: 'The Name of the Message Flow',
            name: 'name',
          },
        },
      ],
    },
  ],
};
