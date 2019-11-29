<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="$t('menu.addstudent')">
          <form>
            <fieldset>
              <legend>
                <b>Personal Information</b>
              </legend>
              <div class="row">
                <div class="flex sm6 xs12">
                  <va-input
                    v-model.lazy="name"
                    placeholder="Enter Name of Student"
                    id="name"
                    label="Name"
                    removable
                    required
                  />
                </div>
                <div class="flex sm6 xs12">
                  <va-input
                    v-model.lazy="fathername"
                    placeholder="Enter Father's Name of Student"
                    id="fathername"
                    label="Father's Name"
                    removable
                    required
                  />
                </div>
                <div class="flex sm6 xs12">
                  <va-input
                    v-model.lazy="rollno"
                    placeholder="Enter 12 digit roll number"
                    id="fathername"
                    label="University Roll Number"
                    removable
                    required
                  />
                </div>
                <div class="flex xs12 sm6">
                  <va-date-picker label="Date of Birth" v-model="dob" />
                </div>
                <div class="flex md6 xs12">
                  <va-select
                    label="Program"
                    v-model="program"
                    textBy="description"
                    :options="programsList"
                    required
                  />
                </div>
                <div class="flex md6 xs12">
                  <va-select
                    v-if="program.description == 'B.E.'"
                    label="Branch"
                    v-model="branch"
                    textBy="description"
                    :options="branchList"
                    required
                  />
                </div>
                <div class="flex md6 xs12">
                  <va-select label="Semester" v-model="semester" textBy="id" :options="semList" />
                </div>
                <div class="flex md6 xs12">
                  <fieldset>
                    <legend>Gender</legend>
                    <va-radio-button option="male" v-model="gender" label="Male" />
                    <va-radio-button option="female" v-model="gender" label="Female" />
                    <va-radio-button option="other" v-model="gender" label="Other" />
                  </fieldset>
                </div>
                <div class="flex md6 xs12">
                  <va-input label="Email Address" v-model="email" type="email" removable />
                </div>
                <div class="flex md6 xs12">
                  <va-input label="Contact Number" v-model="phone" removable />
                </div>
              </div>
            </fieldset>
            <br />

            <fieldset>
              <legend>
                <b>Account Status</b>
              </legend>
              <div class="row">
                <div class="flex md6 xs12">
                  <va-input
                    label="Tuition Fees"
                    v-model="account.tuitionfees"
                    type="number"
                    removable
                    required
                  />
                </div>
                <div class="flex md6 xs12">
                  <va-toggle v-model="account.tuitionpaid" label="Tuition Fees Paid" />
                </div>
                <div class="flex md6 xs12">
                  <va-input label="Library Dues" v-model="account.charges" type="number" removable />
                </div>
                <div class="flex md6 xs12">
                  <va-toggle v-model="account.extrapaid" label="Library and Laboratory Dues Paid" />
                </div>
                <div class="flex xs12 sm6">
                  <va-date-picker label="Last Date of Fees Submission" v-model="account.lastdate" />
                </div>
                <div class="flex md6 xs12">
                  <va-input
                    label="Laboratory Fines"
                    v-model="account.labfine"
                    type="number"
                    removable
                  />
                </div>
              </div>
            </fieldset>
            <br />

            <fieldset>
              <legend>
                <b>Library Status</b>
              </legend>
              <div class="row">
                <div>
                  <va-data-table :fields="fields" :data="bookdatas" no-pagination>
                    <template slot="marker" slot-scope="props">
                      <va-icon name="fa fa-circle" size="8px" />
                    </template>

                    <template slot="actions" slot-scope="props">
                      <va-button
                        flat
                        small
                        color="danger"
                        @click="remove(props.rowData)"
                        class="ma-0"
                      >{{ $t('tables.delete') }}</va-button>
                    </template>
                  </va-data-table>
                </div>
                <br />
                <fieldset>
                  <legend>Issue a book</legend>
                  <div class="row">
                    <div class="flex md4 sm6 xs12">
                      <va-input
                        v-model.lazy="book.bookid"
                        placeholder="Id of book"
                        label="Book Id"
                        removable
                      />
                    </div>
                    <div class="flex md4 sm6 xs12">
                      <va-input
                        v-model.lazy="book.bookname"
                        placeholder="Name of book"
                        label="Book Name"
                        removable
                      />
                    </div>
                    <div class="flex xs12 md4 sm6">
                      <va-date-picker label="Last Date of Submission" v-model="book.lastdate" />
                    </div>
                  </div>
                  <br />
                </fieldset>
                <va-button outline color="dark" v-on:click="issuebook">Issue Book</va-button>
              </div>
            </fieldset>
            <div class="row">
              <div class="flex xs12 md4 sm6"></div>
              <div class="flex xs12 md4 sm6" style="text-align: center">
                <va-button v-on:click="submit" type="submit" large color="dark">Submit</va-button>
              </div>
            </div>
          </form>
        </va-card>
      </div>
    </div>
    <div class="row">
      <div class="flex xs12">
        <va-card :title="$t('menu.qrcode')">
          <div v-if="qrvalue != ''" style="text-align: center">
            <qrcode-vue :value="qrvalue" :size="300" level="H"></qrcode-vue>
          </div>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
var PouchDB = require('pouchdb').default

export default {
  name: 'addstudent',
  components: {
    QrcodeVue,
  },
  data () {
    return {
      name: '',
      fathername: '',
      rollno: '',
      dob: '1999-07-07',
      program: '',
      programsList: [
        {
          id: 1,
          description: 'B.E.',
        },
        {
          id: 2,
          description: 'M.B.A.',
        },
        {
          id: 3,
          description: 'MCA',
        },
      ],
      branch: '',
      branchList: [
        {
          id: 1,
          description: 'CSE',
        },
        {
          id: 2,
          description: 'Mechanical',
        },
        {
          id: 3,
          description: 'ETC',
        },
        {
          id: 4,
          description: 'IT',
        },
        {
          id: 5,
          description: 'Civil',
        },
        {
          id: 6,
          description: 'EEE',
        },
      ],
      semester: 0,
      semList: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
      ],
      email: '',
      gender: '',
      phone: '',

      account: {
        tuitionfees: 0,
        tuitionpaid: false,
        charges: 0,
        extrapaid: false,
        lastdate: '2019-06-05',
        labfine: 0,
      },

      bookdatas: [],

      book: {
        bookid: '',
        bookname: '',
        lastdate: '2019-06-05',
      },

      remoteDB: {},
      qrvalue: '',
    }
  },

  methods: {
    clear (field) {
      this[field] = ''
    },

    remove (bookdata) {
      const idx = this.bookdatas.findIndex(u => u.id === bookdata.id)
      this.bookdatas.splice(idx, 1)
    },

    issuebook () {
      if (this.book.bookid != '' && this.book.bookname != '') {
        let tempbook = JSON.parse(JSON.stringify(this.book))
        this.bookdatas.push(tempbook)
      } else {
        alert('Enter Book ID and Book Name')
      }
    },
    submit () {
      if (this.account.extrapaid == true) {
        this.account.charges = 0
        this.account.labfine = 0
      }
      var studentdata = {
        name: this.name,
        fathername: this.fathername,
        rollno: this.rollno,
        dob: this.dob,
        program: this.program,
        branch: this.branch,
        semester: this.semester,
        email: this.email,
        gender: this.gender,
        phone: this.phone,
        account: this.account,
        bookdatas: this.bookdatas,
      }
      console.log('Studentdata', studentdata)
      this.remoteDB
        .post(studentdata)
        .then(response => {
          console.log(response)
          this.qrvalue = response.id;
          (this.name = ''),
          (this.fathername = ''),
          (this.rollno = ''),
          (this.dob = '1999-07-07'),
          (this.program = ''),
          (this.branch = ''),
          (this.semester = 0),
          (this.email = ''),
          (this.gender = ''),
          (this.phone = ''),
          (this.account.tuitionfees = 0),
          (this.account.tuitionpaid = false),
          (this.account.charges = 0),
          (this.account.extrapaid = false),
          (this.account.lastdate = '2019-06-05'),
          (this.account.labfine = 0),
          (this.bookdatas = []),
          (this.book.bookid = ''),
          (this.book.bookname = ''),
          (this.book.lastdate = '2019-06-05')
        })
        .catch(err => {
          console.log(err)
        })
    },
  },

  created () {
    this.remoteDB = new PouchDB(
      'https://4f241480-c3c9-41c6-bb2e-98fd4cfe269e-bluemix:2d0f75eae437887122aec87b1225ad19a294f459beeb0a20fd69fb333cee4d4a@4f241480-c3c9-41c6-bb2e-98fd4cfe269e-bluemix.cloudantnosqldb.appdomain.cloud/studentinfo'
    )

    this.$nextTick(() => {
      this.$validator.validateAll()
    })
  },

  computed: {
    fields () {
      return [
        {
          name: '__slot:marker',
          width: '30px',
          dataClass: 'text-center',
        },
        {
          name: 'bookid',
          title: this.$t('tables.headings.bookid'),
        },
        {
          name: 'bookname',
          title: this.$t('tables.headings.bookname'),
        },
        {
          name: 'lastdate',
          title: this.$t('tables.headings.lastdate'),
        },
        {
          name: '__slot:actions',
          dataClass: 'text-right',
        },
      ]
    },
  },
}
</script>

<style>
.row.row-inside {
  max-width: none;
}

legend {
  color: rgb(13, 122, 13);
}
</style>
