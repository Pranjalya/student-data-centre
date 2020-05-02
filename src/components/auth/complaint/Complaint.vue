<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="$t('auth.complaint')">
          <form>
            <fieldset>
              <div class="row">
                <div class="flex md6 xs12">
                  <va-input
                    v-model.lazy="name"
                    placeholder="Enter Name of Complainant"
                    id="name"
                    label="Name"
                  />
                </div>
                <div class="flex md6 xs12">
                  <va-date-picker label="Date of Report" v-model="dor" />
                </div>
                <div class="flex md6 xs12">
                  <va-select
                    label="Send report to"
                    v-model="authorities"
                    textBy="description"
                    :options="authoritiesList"
                  />
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
                  <va-input label="Email Address" v-model="email" type="email" />
                </div>
                <div class="flex md6 xs12">
                  <va-input label="Contact Number" v-model="phone" />
                </div>
              </div>
              <va-input
                v-model="complaintText"
                label="Submit your complaint report"
                type="textarea"
                :minRows="6"
                :maxRows="10"
              />
            </fieldset>
            <br />
            <div class="row">
              <div class="flex xs12 md4 sm6"></div>
              <div class="flex xs12 md4 sm6" style="text-align: center">
                <va-button v-on:click="submit" large color="dark">Submit</va-button>
              </div>
            </div>
          </form>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
var PouchDB = require("pouchdb").default;

export default {
  name: "complaint",
  components: {},

  data() {
    return {
      name: "",
      dor: new Date().toISOString().slice(0, 10),
      authorities: "",
      complaintText: "",
      authoritiesList: [
        {
          id: 1,
          description: "Principal"
        },
        {
          id: 2,
          description: "Women Security Cell"
        },
        {
          id: 3,
          description: "Anti-Ragging Committee"
        },
        {
          id: 4,
          description: "CSE HOD"
        },
        {
          id: 5,
          description: "IT HOD"
        },
        {
          id: 6,
          description: "EEE HOD"
        },
        {
          id: 7,
          description: "ME HOD"
        },
        {
          id: 8,
          description: "EE HOD"
        },
        {
          id: 9,
          description: "CE HOD"
        },
        {
          id: 10,
          description: "ETC HOD"
        },
        {
          id: 11,
          description: "MBA HOD"
        },
        {
          id: 12,
          description: "MCA HOD"
        }
      ],
      email: "",
      gender: "",
      phone: "",
      remoteDB: {}
    };
  },

  methods: {
    clear(field) {
      this[field] = "";
    },

    submit() {
      var complaintForm = {
        name: this.name,
        dor: this.dor,
        authorities: this.authorities,
        email: this.email,
        gender: this.gender,
        phone: this.phone,
        complaintText: this.complaintText,
        resolved: false,
      };
      console.log(complaintForm);
      this.remoteDB
        .post(complaintForm)
        .then(response => {
          console.log(response);
          alert("Complaint submitted");
          (this.name = ""),
            (this.dor = new Date().toISOString().slice(0, 10)),
            (this.authorities = ""),
            (this.email = ""),
            (this.gender = ""),
            (this.phone = ""),
            (this.complaintText = "");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  created() {
    this.remoteDB = new PouchDB(
      'https://4f241480-c3c9-41c6-bb2e-98fd4cfe269e-bluemix:2d0f75eae437887122aec87b1225ad19a294f459beeb0a20fd69fb333cee4d4a@4f241480-c3c9-41c6-bb2e-98fd4cfe269e-bluemix.cloudantnosqldb.appdomain.cloud/studentcentrecomplaints'
    );

    this.$nextTick(() => {
      this.$validator.validateAll();
    });
  }
};
</script>

<style lang='scss'>
</style>
