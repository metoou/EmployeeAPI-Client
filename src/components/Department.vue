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
                @click="onDepartmentInfo(item.id, item.name, item.salary)">
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
              <label for="name" class="form-label">ФИО</label>
              <input
                class="form-control"
                type="text"
                v-model="name"
                id="name"/>
            </div>
            <div class="mb-3">
              <label for="salary" class="form-label">Средняя зарплата</label>
              <input
                class="form-control"
                type="text"
                v-model="salary"
                id="salary"/>
            </div>
          </b-card>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Department",
  data() {
    return {
      employees: [],
      departments: [],
      name: "",
      id: "",
      salary: "",
      departmentId: "",
      departmentName: "",
      updateMode: false,
    };
  },
  created() {
    this.GetDepartments();
  },
  methods: {
    async GetDepartments() {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/v1/Departments"
        );
        this.departments = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async GetEmployeestByDepartmentId(id) {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/v1/Employees/department/" + id
        );
        this.departmentName = response.data.name;
        return this.departmentName;
      } catch (error) {
        console.error(error);
      }
    },

    onDepartmentInfo: function (id, name, salary) {
      this.id = id;
      this.name = name;
      this.salary = salary;
      this.$bvModal.show("bv-modal-departmentInfo");
    },
  },
};
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