<template>
  <va-dropdown
    class="profile-dropdown"
    v-model="isShown"
    boundary-body
    offset="0, 16px"
  >
    <span
      class="profile-dropdown__anchor" slot="anchor"
      :style="{color: this.$themes.primary}"
    >
      <slot/>
      <va-icon
        class="pa-1"
        :name="`fa ${isShown ? 'fa-angle-up' :'fa-angle-down'}`"
      />
    </span>
    <div class="profile-dropdown__content pl-4 pr-4 pt-2 pb-2">
      <p
        v-for="option in options"
        :key="option.name"
        v-on:click="logout"
        class="profile-dropdown__item pt-1 pb-1 mt-2 mb-2"
      >
        {{ $t(`user.${option.name}`) }}
      </p>
    </div>
  </va-dropdown>
</template>

<script>
import PouchDB from 'pouchdb'
import PouchAuth from 'pouchdb-authentication'
PouchDB.plugin(PouchAuth)

export default {
  name: 'profile-section',
  data () {
    return {
      isShown: false,
    }
  },
  methods: {
    logout () {
      this.$router.push('login')
    },
  },
  props: {
    options: {
      type: Array,
      default: () => [
        {
          name: 'logout',
        },
      ],
    },
  },
}
</script>

<style lang="scss">
.profile-dropdown {
  cursor: pointer;

  &__anchor {
    color: $vue-green;
  }
  .va-dropdown-popper__anchor {
    display: flex;
    justify-content: flex-end;
  }
  &__content {
    background-color: $dropdown-background;
    box-shadow: $gray-box-shadow;
    border-radius: .5rem;
    width: 8rem;
  }
  &__item {
    display: block;
    color: $vue-darkest-blue;

    &:hover, &:active {
      color: $vue-green;
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>
