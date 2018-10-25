<template>
  <div>
    <van-popup
    :show="todoPopupShow"
    @close="popupCloseHandler()"
    position='top'
    >
      <div class='popupCSS'>
        <input
          v-if='todoAddText'
          class="popupinputCSS"
          v-model='todoText'
          :maxlength="200"
          placeholder="depending"
        >
        <input
          v-else
          class="popupinputCSS"
          v-model='resultText'
          :maxlength="200"
          placeholder="depending"
        >
        <!-- <textarea
          v-if='todoAddText'
          class="popupfieldsCSS"
          v-model='todoText'
          :maxlength="200"
          placeholder="depending"
        >
        </textarea>
        <textarea
          v-else
          class="popupfieldsCSS"
          v-model='resultText'
          :maxlength="200"
          placeholder="depending"
        >
        </textarea> -->
      </div>
    </van-popup>
    <wux-button
      block
      outline
      type="assertive"
      @click='todoNew'
    >Add todo item
    </wux-button>
    <app-todocard
      :key='todoIndex'
      v-for='(todo, todoIndex) in todos'
      :propTodo = todo
      :propTodoIndex = todoIndex
    ></app-todocard>
  </div>
</template>

<script>
import Todocard from './todocard';

export default {
  components: {
    appTodocard: Todocard,
  },
  data() {
    return {
      todoPopupShow: false,
      todoText: '',
      resultText: '',
      todoToChange: 0,
      todoAddText: false,
      resultAddText: false,
      todos: [
        {
          text: 'drink coffee drink coffeedrink coffeedrink coffeedrink coffeedrink coffeedrink coffeedrink coffeedrink coffee',
          done: true,
          result: '',
          showResult: false,
        },
        {
          text: 'eat donner',
          done: false,
          result: '',
          showResult: false,
        },
      ],
    };
  },
  computed: {
  },
  methods: {
    popupCloseHandler() {
      this.todoPopupShow = false;
      this.todoText = '';
      this.resultText = '';
      this.todoToChange = '';
      this.todoAddText = false;
      this.resultAddText = false;
    },
    todoNew() {
      this.todos.push({
        text: '',
        done: false,
        result: '',
        showResult: false,
      });
      this.todoAddText = true;
      this.todoToChange = this.todos.length - 1;
      this.todoPopupShow = !this.todoPopupShow;
    },
  },
  watch: {
    todoText() {
      if (this.todoToChange !== '') {
        this.todos[this.todoToChange].text = this.todoText;
      }
    },
    resultText() {
      if (this.todoToChange !== '') {
        this.todos[this.todoToChange].result = this.resultText;
      }
    },
    todoPopupShow() {
      if (this.todoPopupShow === true && this.todoToChange !== '') {
        this.todoText = this.todos[this.todoToChange].text;
        this.resultText = this.todos[this.todoToChange].result;
      }
    },
  },
  created() {
    this.$root.$on('todoText', (state) => {
      this.todoAddText = true;
      this.todoPopupShow = true;
      this.todoToChange = state;
    });
    this.$root.$on('resultText', (state) => {
      this.resultAddText = true;
      this.todoPopupShow = true;
      this.todoToChange = state;
    });
  },
};
</script>

<style lang="scss" scoped>
.popupCSS {
  font-size: 13px;
  line-height: 30px;
  margin-bottom: 10px;
  text-align: center;
  z-index: 999;
  .popupinputCSS{
    margin-top: 5px;
    border: 2px solid rgb(190, 0, 165);
  }
  .popupfieldsCSS{
    overflow:scroll;
    margin-top: 5px;
    border: 2px solid rgb(190, 0, 165);
  }
}
</style>
