<template>
  <div class="mt-5">
    <div class="container">
      <b-button id="show-btn" @click="onAdd()">Добавить сотрудника</b-button>
      <table class="table mt-3">
        <thead>
          <tr>
            <th scope="col">ФИО</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in employees" :key="item.id">
            <td>{{ item.name }}</td>
            <td class="td-button">
              <button
                class="btn btn-primary"
                @click="
                  onEmployeeInfo(
                    item.id,
                    item.name,
                    item.salary,
                    item.departmentId)">
                Информация
              </button>

              <button
                class="btn btn-primary"
                @click="
                  onUpdate(item.id, item.name, item.salary, item.departmentId)">
                Редактировать
              </button>
              <button class="btn btn-danger" @click="DeleteEmployee(item.id)">
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <b-modal id="bv-modal-employee" hide-footer>
      <form @submit.prevent="AddEmployee(id)">
        <div class="d-block text-center">
          <b-card title="Добавить/редактировать сотрудника">
            <div class="mb-3">
              <label for="name" class="form-label">ФИО</label>
              <input
                class="form-control"
                type="text"
                v-model="name"
                id="name"
                placeholder="ФИО"/>
            </div>
            <div class="mb-3">
              <label for="salary" class="form-label">Зарплата</label>
              <input
                class="form-control"
                type="text"
                v-model="salary"
                id="salary"
                placeholder="Руб."/>
            </div>
            <div class="mb-3">
              <label for="department" class="form-label">Отдел</label>
              <select class="form-control" v-model="departmentId">
                <option
                  v-for="item2 in departments"
                  :key="item2.id"
                  v-bind:value="item2.id">
                  {{ item2.name }}
                </option>
              </select>
            </div>
            <button
              class="btn btn-primary"
              block
              @click="$bvModal.hide('bv-modal-employee')">
              Добавить
            </button>
          </b-card>
        </div>
      </form>
    </b-modal>

    <b-modal id="bv-modal-employeeEdit" hide-footer>
      <form>
        <div class="d-block text-center">
          <b-card title="Информация о сотруднике">
            <div class="mb-3">
              <label for="name" class="form-label">ФИО</label>
              <input
                class="form-control"
                type="text"
                v-model="name"
                id="name"
                placeholder="ФИО"/>
            </div>
            <div class="mb-3">
              <label for="salary" class="form-label">Зарплата</label>
              <input
                class="form-control"
                type="text"
                v-model="salary"
                id="salary"
                placeholder="Руб."/>
            </div>
            <div class="mb-3">
              <label for="department" class="form-label">Отдел</label>
              <select
                class="form-control"
                v-model="departmentId"
                disabled="disabled">
                <option
                  v-for="item2 in departments"
                  :key="item2.id"
                  v-bind:value="item2.id">
                  {{ item2.name }}
                </option>
              </select>
            </div>
          </b-card>
        </div>
      </form>
    </b-modal>

    <b-modal id="bv-modal-employeeInfo" hide-footer>
      <form>
        <div class="d-block text-center">
          <b-card title="Информация о сотруднике">
            <div class="mb-3">
              <label for="name" class="form-label">ФИО</label>
              <input
                class="form-control"
                type="text"
                v-model="name"
                id="name"
                placeholder="ФИО"/>
            </div>
            <div class="mb-3">
              <label for="salary" class="form-label">Зарплата</label>
              <input
                class="form-control"
                type="text"
                v-model="salary"
                id="salary"
                placeholder="Руб."/>
            </div>
            <div class="mb-3">
              <label for="department" class="form-label">Отдел</label>
              <select
                class="form-control"
                v-model="departmentId"
                disabled="disabled">
                <option
                  v-for="item2 in departments"
                  :key="item2.id"
                  v-bind:value="item2.id">
                  {{ item2.name }}
                </option>
              </select>
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
  name: "Employee",
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
    this.GetEmployees(), this.GetDepartments();
  },
  methods: {
    async AddEmployee(id) {
      if (this.updateMode == false) {
        try {
          await axios.post("https://localhost:5001/api/v1/Employees", {
            name: this.name,
            salary: parseFloat(this.salary),
            departmentId: this.departmentId,
          });
        } catch (e) {
          console.log(e);
        }
        this.GetEmployees();
      } else {
        try {
          await axios.put("https://localhost:5001/api/v1/Employees/" + id, {
            name: this.name,
            salary: parseFloat(this.salary),
            departmentId: this.departmentId,
          });
        } catch (e) {
          console.log(e);
        }
        this.GetEmployees();
      }
    },

    async GetEmployees() {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/v1/Employees"
        );
        this.employees = response.data;
      } catch (error) {
        console.error(error);
      }
    },

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

    async DeleteEmployee(id) {
      try {
        await axios.delete("https://localhost:5001/api/v1/Employees/" + id);
      } catch (error) {
        console.error(error);
      }
      this.GetEmployees();
    },

    onUpdate: function (id, name, salary, departmentId) {
      this.updateMode = true;
      this.id = id;
      this.name = name;
      this.salary = salary;
      this.departmentId = departmentId;
      this.$bvModal.show("bv-modal-employee");
    },
    onAdd: function () {
      this.updateMode = false;
      this.id = "";
      this.name = "";
      this.salary = "";
      this.departmentId = "";
      this.$bvModal.show("bv-modal-employee");
    },

    onEmployeeInfo: function (id, name, salary, departmentId) {
      this.id = id;
      this.name = name;
      this.salary = salary;
      this.departmentId = departmentId;
      this.$bvModal.show("bv-modal-employeeInfo");
    },

    async GetDepartmentById(departmentId) {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/v1/Departments/" + departmentId
        );
        this.departmentName = response.data.name;
        return this.departmentName;
      } catch (error) {
        console.error(error);
      }
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