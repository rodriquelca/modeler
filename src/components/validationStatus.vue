<template>
  <div>
    <div class="validation-container position-absolute text-left" v-if="toggleValidationPanel">
      <span class="validation-container__defaultMessage d-flex justify-content-center align-items-center h-100" v-if="!numberOfValidationErrors">no problems to report</span>
      <div class="validation-container__list d-flex justify-content-between" v-for="error in errorList" :key="error.id">
        <span class="validation-container__list--errorCategory d-flex justify-content-center">
          <font-awesome-icon class="status-bar-container__status-icon" :style="{ color: iconColor }" :icon="valditionIcon" />
        </span>
        <span class="validation-container__list--id">
          {{ error.id }}
        </span>
        <span class="validation-container__list--message">
          <span class="validation-container__list--key">{{ error.errorKey }}</span>
          <div>{{ error.message }}</div>
        </span>
      </div>
    </div>
     <div class="status-bar-container d-flex align-items-center justify-content-around">
      <button class="status-bar-container__validate-button btn-sm btn-info" @click="validateDiagram">Validate BPMN</button>
      <span class="status-bar-container__status" @click="toggleValidationPanel = !toggleValidationPanel">
        <span class="status-bar-container__status-text">Problems {{ numberOfValidationErrors }}</span>
        <font-awesome-icon class="status-bar-container__status-icon" :style="{ color: statusColor }" :icon="statusIcon" />
        <font-awesome-icon class="status-bar-container__status-ellipsis" :icon="ellipsisIcon" />
      </span>
    </div>
  </div>
</template>

<script>
import { faCheckCircle, faTimesCircle, faEllipsisV, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components : {
    FontAwesomeIcon,
  },
  props: ['validationErrors'],
  data() {
    return {
      toggleValidationPanel: false,
      errorColor: '#D9534F',
      warningColor: '#F0AD4E',
      validColor: '#40C057',
    };
  },
  methods: {
    validateDiagram() {
      this.$root.$emit('Modeler');
    },
  },
  computed: {
    errorList() {
      return Object.entries(this.validationErrors).reduce((errorList, [ errorKey, errors ]) => {
        const errorListItems = errors.map((error) => {
          return  {
            id: error.id,
            errorKey,
            category: error.category,
            message: error.message,
          };
        });

        errorList.push(...errorListItems);
        return errorList;
      }, []);
    },
    getCategory() {
      const errorCategory = this.errorList.find((category) => {
        return category;
      });
      return errorCategory;
    },
    ellipsisIcon() {
      return faEllipsisV;
    },
    statusIcon() {
      return this.hasValidationErrors
        ? faTimesCircle
        : faCheckCircle;
    },
    valditionIcon() {
      return this.isErrorOrWarning
        ? faTimesCircle
        : faExclamationTriangle;
    },
    isErrorOrWarning() {
      return this.getCategory.category === 'error' ? true : false;
    },
    iconColor() {
      return this.isErrorOrWarning
        ? `${ this.errorColor }`
        : `${ this.warningColor }`;
    },
    statusColor() {
      return this.hasValidationErrors
        ? `${ this.errorColor }`
        : `${ this.validColor }`;
    },
    hasValidationErrors() {
      return this.numberOfValidationErrors > 0;
    },
    numberOfValidationErrors() {
      return this.errorList.length;
    },
  },
};
</script>

<style scoped lang="scss">
$primary-white: #F0F3F7;
$seconadry-grey: #555555;
$secondary-blue: #3397e1;
$border-color: #aaaaaa;
$text-size-sm: 0.85rem;
$id-container-width: 6.5rem;
$message-container-width: 18rem;
$error-category-width: 1rem;
$validation-container-height: 20rem;
$validation-container-width: 28rem;
$status-bar-container-height: 3rem;
$status-bar-container-width: 16rem;
$error-color: #D9534F;
$warning-color: #F0AD4E;
$button-color: #3BD7FF;

.status-bar-container {
  font-size: $text-size-sm;
  color: $seconadry-grey;
  height: $status-bar-container-height;
  width: $status-bar-container-width;
  cursor: pointer;

  &__validate-button {
    background-color: $button-color;
    border: none;
    border-radius: 1.25rem;
    cursor: pointer;
  }

  &__status {
    cursor: pointer;
  }

  &__status-ellipsis {
    &:hover {
      color: $secondary-blue;
    }
  }

  &__status-icon {
    margin: 0 0.75rem;
  }
}

.validation-container {
  bottom: 0;
  right: 0;
  height: $validation-container-height;
  width: $validation-container-width;
  background-color: $primary-white;
  overflow: scroll;
  margin-bottom: 3rem;
  border: 1px solid $border-color;

  &__defaultMessage {
    text-transform: capitalize;
  }

  &__list {
    padding: 1rem;
    word-wrap: break-word;

    &--id {
      width: $id-container-width;
      color: $seconadry-grey;
      text-transform: none;
    }

    &--message {
      width: $message-container-width;
      text-transform: capitalize;
    }

    &--errorCategory {
      width: 2rem;
      padding: 0.25rem 1rem 0 0.5rem;
      width: $error-category-width;
    }

    &--key {
      font-weight: 700;
    }
  }

  .label-background-warning {
    background-color: $warning-color;
  }

  .label-background-error {
    background-color: $error-color;
  }
}
</style>
