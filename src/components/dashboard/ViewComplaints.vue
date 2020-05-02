<template>
  <div class="lists">
    <div class="row">
      <div class="flex xs12 lg6" v-for="authority in authoritiesList" v-bind:key="authority.index">
        <va-list fit class="mb-1">
          <va-list-label>{{ authority.description }}</va-list-label>
          <template v-for="(complaint, i) in authority.complaints">
            <va-accordion :key="complaint.index">
              <va-collapse>
                <span slot="header">{{ complaint.name }}</span>
                <div slot="body">
                  <form>
                    <fieldset>
                      <div class="row">
                        <div class="flex md6 xs12">Date of Report : {{ complaint.dor }}</div>
                        <div class="flex md6 xs12">
                          Gender :
                          <va-icon
                            :name="getGenderIcon(complaint.gender)"
                            :color="getGenderColor(complaint.gender)"
                          />
                        </div>
                        <div class="flex md6 xs12">Email Address : {{ complaint.email }}</div>
                        <div class="flex md6 xs12">Contact Number : {{ complaint.phone }}</div>
                      </div>
                      <div class="row">
                        <div class="flex md10 xs16">{{ complaint.complaintText }}</div>
                      </div>
                    </fieldset>
                    <br />
                    <div class="row">
                      <div class="flex xs12 md4 sm6"></div>
                      <div class="flex xs12 md4 sm6" style="text-align: center">
                        <va-button v-on:click="resolve(complaint)" small color="dark">Resolve</va-button>
                      </div>
                    </div>
                  </form>
                </div>
              </va-collapse>
            </va-accordion>
          </template>
        </va-list>
      </div>
    </div>
  </div>
</template>

<script>
import data from "./data.json";
import PouchDB from "pouchdb";

export default {
  name: "viewcomplaints",
  data() {
    return {
      customers: data.slice(0, 5),
      archived: data.slice(5, 8),
      appBanners: false,
      banners: false,
      notifications: true,
      remoteDB: {},
      complaints: [],
      authoritiesList: [
        {
          description: "Principal",
          complaints: []
        },
        {
          complaints: [],
          description: "Women Security Cell"
        },
        {
          complaints: [],
          description: "Anti-Ragging Committee"
        },
        {
          complaints: [],
          description: "CSE HOD"
        },
        {
          complaints: [],
          description: "IT HOD"
        },
        {
          complaints: [],
          description: "EEE HOD"
        },
        {
          complaints: [],
          description: "ME HOD"
        },
        {
          complaints: [],
          description: "EE HOD"
        },
        {
          complaints: [],
          description: "CE HOD"
        },
        {
          complaints: [],
          description: "ETC HOD"
        },
        {
          complaints: [],
          description: "MBA HOD"
        },
        {
          complaints: [],
          description: "MCA HOD"
        },
        {
          description: "Resolved",
          complaints: []
        }
      ]
    };
  },
  methods: {
    getGenderIcon(gender) {
      return gender === "male" ? "fa fa-mars" : "fa fa-venus";
    },
    getGenderColor(gender) {
      return gender === "male" ? "blue" : "pink";
    },
    notify(name) {
      this.showToast(`Clicked ${name}`, {
        position: "bottom-right"
      });
    },
    resolve(complaint) {
      this.remoteDB.get(complaint._id).then(doc => {
        this.remoteDB
          .put({
            _id: complaint._id,
            name: complaint.name,
            dor: complaint.dor,
            authorities: complaint.authorities,
            email: complaint.email,
            gender: complaint.gender,
            phone: complaint.phone,
            complaintText: complaint.complaintText,
            resolved: true,
            _rev: doc._rev
          })
          .then(res => {
            console.log("Resolved complaint");
          });
      });
    },
    toggleStar(customer) {
      customer.starred = !customer.starred;
    }
  },

  created() {
    this.remoteDB = new PouchDB(
      "https://4f241480-c3c9-41c6-bb2e-98fd4cfe269e-bluemix:2d0f75eae437887122aec87b1225ad19a294f459beeb0a20fd69fb333cee4d4a@4f241480-c3c9-41c6-bb2e-98fd4cfe269e-bluemix.cloudantnosqldb.appdomain.cloud/studentcentrecomplaints"
    );

    this.$nextTick(() => {
      this.$validator.validateAll();
    });
  },

  mounted() {
    this.remoteDB
      .allDocs({
        include_docs: true,
        attachments: true
      })
      .then(result => {
        this.complaints = result.rows;
        console.log(this.complaints);
        this.complaints.forEach(res => {
          if (res.doc.resolved) {
            let i = this.authoritiesList.findIndex(
              x => x.description == "Resolved"
            );
            this.authoritiesList[i].complaints.push({
              _id: res.doc._id,
              name: res.doc.name,
              dor: res.doc.dor,
              authorities: res.doc.authorities,
              email: res.doc.email,
              gender: res.doc.gender,
              phone: res.doc.phone,
              complaintText: res.doc.complaintText,
              resolved: true
            });
          } else {
            console.log("Authority : ", res.doc.authorities.description);
            var i = this.authoritiesList.findIndex(
              x => x.description == res.doc.authorities.description
            );
            this.authoritiesList[i].complaints.push({
              _id: res.doc._id,
              name: res.doc.name,
              dor: res.doc.dor,
              authorities: res.doc.authorities,
              email: res.doc.email,
              gender: res.doc.gender,
              phone: res.doc.phone,
              complaintText: res.doc.complaintText,
              resolved: false
            });
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
