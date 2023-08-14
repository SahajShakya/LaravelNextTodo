import { useState, useEffect } from 'react'
import axios from "axios";


export default function Todo() {

    const [todos, setTodos] = useState([]);
    const [ title, setTitle ] = useState();
    const [ todoid, setTodoId ] = useState();
    const [loading, setLoading ] = useState(false);

    useEffect(() => {
    fetchTodo();
    }, [])

async function fetchTodo() {
  setLoading(true);
    await axios.get('https://todolaravelnext2.000webhostapp.com/api/todos')
        .then((res) => {
            setTodos(res.data);
            setLoading(false);
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

      let url = 'https://todolaravelnext2.000webhostapp.com/api/todos';

      if(todoid) {
          url = 'https://todolaravelnext2.000webhostapp.com/api/todos/'+todoid;
          formData.append('_method', 'PUT');
      }

      const requestOptions = {
         method: 'POST',
         body: formData,
       };

       fetch(url, requestOptions)
          .then((res) => res.json())
          .then((data) => {
            setTitle('');
            fetchTodo();
            setTodoId('');
          })
          .catch((error) => {
            console.error('Error:', error);
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

  // JavaScript (Using Fetch API)
  const deleteTodo = (id) => {
      const formData = new FormData();
      formData.append('_method', 'DELETE'); // Set the _method parameter to DELETE

      fetch(`https://todolaravelnext2.000webhostapp.com/api/todos/${id}`, {
          method: 'POST', // Use POST method
          body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
            setTitle('');
            fetchTodo();
            setTodoId('');
      })
      .catch((error) => {
          // Handle error
          console.error('Error:', error);
      });
  };

  // const isDoneTodo = (id, isdone) => {
  //     let params = { is_done: !isdone };
  //     const requestOptions = {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(params),
  //     };
  //
  //     fetch(`https://todolaravelnext2.000webhostapp.com/api/todos/isdone/${id}`, requestOptions)
  //         .then((res) => {
  //             if (!res.ok) {
  //                 throw new Error(`HTTP error! Status: ${res.status}`);
  //             }
  //             return res.json();
  //         })
  //         .then((data) => {
  //             setTitle('');
  //             fetchTodo();
  //             setTodoId('');
  //         })
  //         .catch((error) => {
  //             console.error('Error:', error);
  //         });
  // };


  const toggleIsDone = (id, isDone) => {
      const requestOptions = {
          method: 'POST', // Use POST method
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _method: 'PUT', is_done: !isDone }), // Add _method field
      };

      fetch(`https://todolaravelnext2.000webhostapp.com/api/todos/${id}/toggle`, requestOptions)
          .then((res) => {
              if (!res.ok) {
                  throw new Error(`HTTP error! Status: ${res.status}`);
              }
              return res.json();
          })
          .then(() => {
              fetchTodo(); // Update the todo list
          })
          .catch((error) => {
              console.error('Error:', error);
          });
  };



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
                                      <tr key={index} >
                                          <td>

                                          </td>
                                          <td>{ index + 1 }</td>
                                          <td>{ todo.title }</td>
                                          <td>

                                                      <button className="btn btn-primary btn-sm" onClick={() => editTodo(todo.id)}>
                                                          Edit
                                                      </button>


                                              &nbsp;

                                                      <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}  >
                                                          Done
                                                      </button>


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
    );
}
