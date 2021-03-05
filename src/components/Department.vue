<template>
  <div class="mt-5">
    <div class="container">
      <table class="table mt-3">
        <thead>
          <tr>
            <th scope="col">Название</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in departments" :key="item.id" class="tr-">
            <td>{{ item.name }}</td>
            <td class="td-button">
              <button
                class="btn btn-primary"
                @click="onDepartmentInfo(item.id, item.name)">
                Информация
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <b-modal id="bv-modal-departmentInfo" hide-footer>
      <form>
        <div class="d-block text-center">
          <b-card title="Информация об отделе">
            <div class="mb-3">
              <label for="name" class="form-label">Отдел</label>
              <input
                class="form-control"
                type="text"
                v-model="departmentName"
                id="name"/>
            </div>
            <div class="mb-3">
              <label class="form-label">Количество сотрудников:  </label>
              <label class="form-label">{{employeesCount}}</label>
              <select
                class="form-control">
                <option
                  v-for="item in responseData"
                  :key="item.id"
                  v-bind:value="item.id">
                  {{ item.name }} / Зарплата: {{item.salary}}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="salary" class="form-label">Средняя зарплата</label>
            </div>
            <input
                class="form-control"
                type="text"
                v-model="avrSalary"
                id="name"/>
          </b-card>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {HTTP} from "@/axios.js";

export default {
  name: "Department",
  data() {
    return {
      employeesCount: "",
      departments: [],
      responseData: [],
      name: "",
      id: "",
      avrSalary: 0,
      sum: 0,
    };
  },
  created() {
    this.GetDepartments();
  },
  methods: {
    async GetDepartments() {
      try {
        const response = await HTTP.get(
          "Departments"
        );
        this.departments = response.data;
        console.log( this.departments);
      } catch (error) {
        console.error(error);
      }
    },

      async onDepartmentInfo (id, name) {
        this.avrSalary = 0;
        this.sum = 0;
        this.departmentName = name;
        const response = await HTTP.get(
          "Employees/department/" + id
        )
        this.responseData = response.data;
        this.employeesCount = this.responseData.length;
          for (let i = 0; i < this.employeesCount; i++) {
            this.sum += this.responseData[i].salary
          }
        this.avrSalary = this.sum/this.employeesCount;
        this.$bvModal.show("bv-modal-departmentInfo");
    },  
  }
}
</script>

<style>
.btn {
  float: left;
  margin: 10px 10px;
}
table {
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
}
.td-button {
  display: flex;
  justify-content: center;
}
</style>