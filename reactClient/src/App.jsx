import { useState, useEffect } from 'react'
import axios from "axios";
function App() {

  const [todos, setTodos] = useState([]);

  const [ title, setTitle ] = useState();
  const [ todoid, setTodoId ] = useState();

  useEffect(() => {
      fetchTodo();
  }, [])

  async function fetchTodo() {
      await axios.get('http://127.0.0.1:8000/api/todos/')
          .then((res) => {
              setTodos(res.data);
              console.log(todos);
          })
  }

  const titleChange = (e) => {
      setTitle(e.target.value);
  }

  const submitForm = (e) => {
      e.preventDefault();
      var formData = new FormData();
      formData.append('title', title);
      formData.append('is_done', 0);

      let url = 'http://127.0.0.1:8000/api/todos/';

      if(todoid) {
          url = 'http://127.0.0.1:8000/api/todos/'+todoid;
          formData.append('_method', 'PUT');
      }

      axios.post(url, formData)
          .then((res) => {
              setTitle('');
              fetchTodo();
              setTodoId('');
          });
  }

  const editTodo = (id) => {
      setTodoId(id);
      todos.map((todo) =>{
          if(todo.id == id) {
              setTitle(todo.title);
          }
      })
  }

  const deleteTodo = (id) => {
      let params = {'_method': 'DELETE'};
      axios.post('http://127.0.0.1:8000/api/todos/'+id, params)
          .then((res) => {
              setTitle('');
              fetchTodo();
              setTodoId('');
          });
  }

  const isDoneTodo = (id, isdone) => {
      let params = {'is_done': !isdone}
      axios.post('/api/todos/isdone/'+id, params)
          .then((res) => {
              setTitle('');
              fetchTodo();
              setTodoId('');
          });
  }

return (
  <>

    <main>
        <div className="containter">
            <div className="row justify-content-center mt-10">
                <div className="col-sm-7">
                    <h1 className="text-center">Todo App</h1>
                    <form onSubmit={submitForm}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type Here"
                                onChange={titleChange}
                                value={title}
                                name="title"
                            />
                            <div className="input-group-append">
                                <button type="submit" className="input-group-text">Submit</button>
                            </div>
                        </div>
                    </form>
                    <table className="table table-border">
                        <thead>
                          <tr>
                              <th></th>
                              <th>Sn</th>
                              <th>Title</th>
                              <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {
                              todos
                                  &&
                              todos?.map((todo,index) => (
                                  <tr key={index} className={ todo.is_done ? 'text-decoration-line-through' : '' } >
                                      <td>
                                          <input
                                              type="checkbox"
                                              className="form-check-input"
                                              checked={todo.is_done}
                                              onChange={()=>isDoneTodo(todo.id, todo.is_done)}
                                          />
                                      </td>
                                      <td>{ index + 1 }</td>
                                      <td>{ todo.title }</td>
                                      <td>
                                          {
                                              todo.is_done ? ''
                                                  :
                                                  <button className="btn btn-primary btn-sm" onClick={() => editTodo(todo.id)}>
                                                      Edit
                                                  </button>
                                          }

                                          &nbsp;
                                          {
                                              todo.is_done ? ''
                                                  :
                                                  <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}  >
                                                      Delete
                                                  </button>

                                          }

                                      </td>
                                  </tr>
                              ))
                          }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
  </>
)
}

export default App
