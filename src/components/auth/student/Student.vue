<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12" style="text-align: center">
        <va-card :title="$t('menu.qrcode')">
          <vue-qr-reader
            ref="qr"
            v-on:code-scanned="codeScanned"
            :stop-on-scanned="true"
            :use-back-camera="true"
            :draw-on-found="true"
            line-color="#FEFEFE"
            :line-width="4"
            :responsive="true"
          ></vue-qr-reader>
        </va-card>
      </div>
    </div>
    <div class="row">
      <div class="flex xs12">
        <va-card :title="$t('menu.student')" v-if="scanned">
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
                    disabled
                  />
                </div>
                <div class="flex sm6 xs12">
                  <va-input
                    v-model.lazy="fathername"
                    placeholder="Enter Father's Name of Student"
                    id="fathername"
                    label="Father's Name"
                    disabled
                  />
                </div>
                <div class="flex sm6 xs12">
                  <va-input
                    v-model.lazy="rollno"
                    placeholder="Enter 12 digit roll number"
                    id="rollno"
                    label="University Roll Number"
                    disabled
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
                    disabled
                  />
                </div>
                <div class="flex md6 xs12">
                  <va-select
                    v-if="program.description == 'B.E.'"
                    label="Branch"
                    v-model="branch"
                    textBy="description"
                    :options="branchList"
                    disabled
                  />
                </div>
                <div class="flex md6 xs12">
                  <va-select
                    label="Semester"
                    v-model="semester"
                    textBy="id"
                    :options="semList"
                    disabled
                  />
                </div>
                <div class="flex md6 xs12">
                  <fieldset>
                    <legend>Gender</legend>
                    <va-radio-button option="male" v-model="gender" label="Male" disabled />
                    <va-radio-button option="female" v-model="gender" label="Female" disabled />
                    <va-radio-button option="other" v-model="gender" label="Other" disabled />
                  </fieldset>
                </div>
                <div class="flex md6 xs12">
                  <va-input label="Email Address" v-model="email" type="email" disabled />
                </div>
                <div class="flex md6 xs12">
                  <va-input label="Contact Number" v-model="phone" disabled />
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
                    disabled
                  />
                </div>
                <div class="flex md6 xs12">
                  <va-toggle v-model="account.tuitionpaid" label="Tuition Fees Paid" disable />
                </div>
                <div class="flex md6 xs12">
                  <va-input label="Library Dues" v-model="account.charges" type="number" disabled />
                </div>
                <div class="flex md6 xs12">
                  <va-toggle v-model="account.extrapaid" label="Library Dues Paid" disable />
                </div>
                <div class="flex xs12 sm6">
                  <va-date-picker
                    label="Last Date of Fees Submission"
                    v-model="account.lastdate"
                    disabled
                  />
                </div>
                <div class="flex md6 xs12">
                  <va-input
                    label="Laboratory Fines"
                    v-model="account.labfine"
                    type="number"
                    disabled
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
                  </va-data-table>
                </div>
                <br />
              </div>
            </fieldset>
          </form>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import VueQrReader from "vue-qr-reader/dist/lib/vue-qr-reader.umd.js";
var PouchDB = require("pouchdb").default;

var Email = {
  send: function(a) {
    return new Promise(function(n, e) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function(e) {
        n(e);
      });
    });
  },
  ajaxPost: function(e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      (a.onload = function() {
        var e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function(e, n) {
    var t = Email.createCORSRequest("GET", e);
    (t.onload = function() {
      var e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function(e, n) {
    var t = new XMLHttpRequest();
    return (
      "withCredentials" in t
        ? t.open(e, n, !0)
        : "undefined" != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    );
  }
};

export default {
  name: "student",
  components: {
    VueQrReader
  },

  data() {
    return {
      scanned: false,
      studentid: "",
      name: "",
      fathername: "",
      rollno: "",
      dob: "1999-07-07",
      program: "",
      programsList: [
        {
          id: 1,
          description: "B.E."
        },
        {
          id: 2,
          description: "M.B.A."
        },
        {
          id: 3,
          description: "MCA"
        }
      ],
      branch: "",
      branchList: [
        {
          id: 1,
          description: "CSE"
        },
        {
          id: 2,
          description: "Mechanical"
        },
        {
          id: 3,
          description: "ETC"
        },
        {
          id: 4,
          description: "IT"
        },
        {
          id: 5,
          description: "Civil"
        },
        {
          id: 6,
          description: "EEE"
        }
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
        { id: 8 }
      ],
      email: "",
      gender: "",
      phone: "",

      account: {
        tuitionfees: 0,
        tuitionpaid: false,
        charges: 0,
        extrapaid: false,
        lastdate: "2019-06-05",
        labfine: 0
      },

      bookdatas: [],

      book: {
        bookid: "",
        bookname: "",
        lastdate: "2019-06-05"
      },

      remoteDB: {}
    };
  },

  methods: {
    clear(field) {
      this[field] = "";
    },

    codeScanned(code) {
      this.studentid = code;
      this.remoteDB
        .get(this.studentid)
        .then(doc => {
          this.name = doc.name;
          this.fathername = doc.fathername;
          this.dob = doc.dob;
          this.rollno = doc.rollno;
          this.program = doc.program;
          this.branch = doc.branch;
          this.semester = doc.semester;
          this.email = doc.email;
          this.gender = doc.gender;
          this.phone = doc.phone;
          this.account = doc.account;
          this.bookdatas = doc.bookdatas;
          // console.log("Email : ", this.email)
          Email.send({
            Host: "smtp.gmail.com",
            Username: "freetrialtext@gmail.com",
            Password: "freetrial",
            To: this.email,
            From: "freetrialtext@gmail.com",
            Body:
              "Someone successfully scanned your QR code at " +
              new Date().toLocaleTimeString() +
              " on " +
              new Date().toLocaleDateString() +
              ". Please ignore the mail if it was you.",
            Subject: "Someone looked at your account"
          })
            .then(message => console.log(message))
            .catch(err => console.log("This email does not exist ", err));
          // axios
          //   .post("https://api.smtp2go.com/v3/email/send", {
          //     api_key: "api-64F1E7888C2011EA862CF23C91C88F4E",
          //     to: ["<" + doc.email + ">"],
          //     sender: "<freetrialtext@gmail.com>",
          //     subject: "Someone looked at your account",
          //     text_body:
          //       "Someone successfully scanned your QR code at " +
          //       new Date().toLocaleTimeString() +
          //       " on " +
          //       new Date().toLocaleDateString() +
          //       ". Please ignore the mail if it was you."
          //   })
          //   .then(response => {
          //     console.log(response);
          //   })
          //   .catch(err => console.log);
        })
        .catch(err => {
          console.log(err);
          if (err.status == 404) {
            alert("Invalid QR Code");
            document.location.reload();
          }
        });
      this.scanned = true;
    }
  },

  created() {
    this.remoteDB = new PouchDB(
      "https://4f241480-c3c9-41c6-bb2e-98fd4cfe269e-bluemix:2d0f75eae437887122aec87b1225ad19a294f459beeb0a20fd69fb333cee4d4a@4f241480-c3c9-41c6-bb2e-98fd4cfe269e-bluemix.cloudantnosqldb.appdomain.cloud/studentinfo"
    );

    this.$nextTick(() => {
      this.$validator.validateAll();
    });
  },

  computed: {
    fields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center"
        },
        {
          name: "bookid",
          title: this.$t("tables.headings.bookid")
        },
        {
          name: "bookname",
          title: this.$t("tables.headings.bookname")
        },
        {
          name: "lastdate",
          title: this.$t("tables.headings.lastdate")
        },
        {
          name: "__slot:actions",
          dataClass: "text-right"
        }
      ];
    }
  }
};
</script>

<style lang='scss'>
</style>
