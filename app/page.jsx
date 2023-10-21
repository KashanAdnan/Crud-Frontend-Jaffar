'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [data, setData] = useState([])
  const [password, setPassword] = useState("")
  const handleForm = (e) => {
    e.preventDefault();
    axios.post("https://crud-sir-bilal.vercel.app/add", { name, email, password })
      .then((res) => {
        toast.success("Added Succesfully!")
        getData()
      }).catch((err) => {
        toast.error(err)
      })
  }
  useEffect(() => {
    axios.get("https://crud-sir-bilal.vercel.app/get").then((res) => {
      setData(res.data.users)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const getData = () => {
    axios.get("https://crud-sir-bilal.vercel.app/get").then((res) => {
      setData(res.data.users)
    }).catch((err) => {
      console.log(err);
    })
  }
  const deleteData = (id) => {
    axios.delete("https://crud-sir-bilal.vercel.app/delete/" + id).then((res) => {
      toast.success("Deleted Succesfully!")
      getData()
    }).catch((err) => {
      console.log(err);
    })
  }
  const updatetData = (id, index) => {
    const name = prompt(`Enter Name`, `${data[index].name}`)
    const email = prompt(`Enter Email`, `${data[index].email}`)
    const password = prompt(`Enter Password`, `${data[index].password}`)
    let updateObj = {
      name,
      email,
      password
    }
    axios.put("https://crud-sir-bilal.vercel.app/update/" + id, { ...updateObj }).then((res) => {
      toast.success("Updated Succesfully!")
      getData()
    }).catch((err) => {
      console.log(err);
    })
  }
  console.log(data);
  return (
    <>
      <h1 className="heading">CRUD OPERATION</h1>
      <form onSubmit={(e) => handleForm(e)} className="crud-dashboard">
        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" />
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
        <button>Add</button>
      </form>
      <h1 className="heading" style={{ marginBottom: "30px" }}>GET DATA</h1>
      <div className="crud-show">
        <table>
          {
            data.map((item, index) => {
              return <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td className="delete"><button onClick={() => deleteData(item._id)}>Delete</button></td>
                <td><button onClick={() => updatetData(item._id, index)}>Update</button></td>
              </tr>

            })
          }
        </table>
      </div >
      <Toaster />
    </>
  )
}