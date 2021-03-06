import component from './gateway.vue';


export default {
  id: 'processmaker-modeler-gateway',
  component,
  bpmnType: ['bpmn:ExclusiveGateway', 'bpmn:ParallelGateway', 'bpmn:InclusiveGateway'],
  control: true,
  category: 'BPMN',
  label: 'Gateway',
  definition(moddle) {
    return moddle.create('bpmn:Gateway', {
      name: 'New Gateway',
    });
  },
  diagram(moddle) {
    return moddle.create('bpmndi:BPMNShape', {
      bounds: moddle.create('dc:Bounds', {
        height: 36,
        width: 36,
      }),
    });
  },
  inspectorConfig: [
    {
      name: 'Gateway',
      items: [
        {
          component: 'FormText',
          config: {
            label: 'Gateway',
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
            helper: 'The Name of the Gateway',
            name: 'name',
          },
        },
      ],
    },
  ],
};
