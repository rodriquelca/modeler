import component from './task.vue';

export const taskHeight = 76;

export default {
  id: 'processmaker-modeler-task',
  component,
  bpmnType: ['bpmn:Task', 'bpmn:UserTask'],
  control: true,
  category: 'BPMN',
  icon: require('@/assets/toolpanel/task.svg'),
  label: 'Task',
  definition(moddle) {
    return moddle.create('bpmn:Task', {
      name: 'New Task',
    });
  },
  diagram(moddle) {
    return moddle.create('bpmndi:BPMNShape', {
      bounds: moddle.create('dc:Bounds', {
        height: taskHeight,
        width: 116,
      }),
    });
  },
  inspectorConfig: [
    {
      name: 'Task',
      items: [
        {
          component: 'FormText',
          config: {
            label: 'Task',
            fontSize: '2em',
          },
        },
        {
          component: 'FormAccordion',
          container: true,
          config: {
            label: 'Configuration',
            icon: 'cog',
            name: 'confifuration',
          },
          items: [
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
                helper: 'The Name of the Task',
                name: 'name',
              },
            },
          ],
        },
      ],
    },
  ],
};
