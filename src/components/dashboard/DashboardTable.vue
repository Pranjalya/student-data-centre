<template>
  <va-card :title="$t('dashboard.table.title')">
    <div class="row align--center mb-1">
      <div class="flex xs12 sm6">
        <va-input
          class="ma-0"
          :value="term"
          :placeholder="$t('tables.searchByName')"
          @input="search"
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
    </div>

    <va-data-table :fields="fields" :data="filteredInfo" :loading="loading" hoverable>
      <template slot="icon" slot-scope="props">
        <va-icon name="fa fa-user" color="secondary" />
      </template>

      <template slot="tuitionstatus" slot-scope="props">
        <va-badge
          :color="getStatusColor(props.rowData.account.tuitionpaid)"
        >{{ props.rowData.account.tuitionpaid }}</va-badge>
      </template>

      <template slot="extrastatus" slot-scope="props">
        <va-badge
          :color="getStatusColor(props.rowData.account.extrapaid)"
        >{{ props.rowData.account.extrapaid }}</va-badge>
      </template>

      <template slot="actions" slot-scope="props">
        <va-button
          small
          outline
          color="success"
          icon="fa fa-check"
          class="ma-0"
          @click="resolveInfo(props.rowData)"
        >{{ $t('dashboard.table.resolve') }}</va-button>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import { debounce } from 'lodash'
import PouchDB from 'pouchdb'

export default {
  data () {
    return {
      loading: false,
      term: null,
      mode: 0,
      remoteDB: {},
      info: [],
    }
  },
  computed: {
    fields () {
      return [
        {
          name: '__slot:icon',
          width: '30px',
          dataClass: 'text-center',
        },
        {
          name: 'name',
          title: this.$t('tables.headings.name'),
          width: '30%',
        },
        {
          name: 'email',
          title: this.$t('tables.headings.email'),
          width: '30%',
        },
        {
          name: '__slot:tuitionstatus',
          title: this.$t('tables.headings.tuition'),
          width: '20%',
        },
        {
          name: '__slot:extrastatus',
          title: this.$t('tables.headings.extra'),
          width: '20%',
        },
        {
          name: '__slot:actions',
          dataClass: 'text-right',
        },
      ]
    },

    filteredInfo () {
      if (!this.term || this.term.length < 1) {
        return this.info
      }
      return this.info.filter(item => {
        return item.name.toLowerCase().startsWith(this.term.toLowerCase())
      })
    },
  },

  methods: {
    resolveInfo (user) {
      this.loading = true

      setTimeout(() => {
        const idx = this.info.findIndex(u => u._id === user._id)
        this.info.splice(idx, 1)
        this.loading = false

        this.showToast(this.$t('dashboard.table.resolved'), {
          icon: 'fa-check',
          position: 'bottom-right',
          duration: 1500,
        })
      }, 500)

      window.open(
        'mailto:' +
          user.email +
          '?subject=Pay%20your%20dues&body=You%20have%20unresolved%20dues%20Pay%20them%20as%20soon%20as%20possible',
        '_blank'
      )
    },

    getStatusColor (status) {
      if (status == true) {
        return 'success'
      }
      return 'danger'
    },

    search: debounce(function (term) {
      this.term = term
    }, 400),
  },

  created () {
    this.remoteDB = new PouchDB(
      'https://4f241480-c3c9-41c6-bb2e-98fd4cfe269e-bluemix:2d0f75eae437887122aec87b1225ad19a294f459beeb0a20fd69fb333cee4d4a@4f241480-c3c9-41c6-bb2e-98fd4cfe269e-bluemix.cloudantnosqldb.appdomain.cloud/studentinfo'
    )
  },

  mounted () {
    this.remoteDB
      .allDocs({
        include_docs: true,
        attachments: true,
      })
      .then(result => {
        var infos = result.rows
        infos.forEach(element => {
          if (
            !element.doc.account.tuitionpaid ||
            !element.doc.account.extrapaid
          ) { this.info.push(element.doc) }
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
}
</script>

<style lang="scss">
</style>
