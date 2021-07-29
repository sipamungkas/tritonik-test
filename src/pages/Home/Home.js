import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home(props) {
  const history = useHistory();
  const token = props.location.state?.token || null;
  const [data, setData] = useState([]);
  //   const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  let query = useQuery();

  useEffect(() => {
    if (!token) {
      return history.push("/");
    }
  }, [token, history]);
  useEffect(() => {
    const page = query.get("page");

    axios
      .get(
        `https://testm2m.tritronik.com/test/table?page=${
          page || 1
        }&data_per_page=10`,
        {
          headers: {
            Token: token,
          },
        }
      )
      .then((res) => {
        // return props.setToken(res.data.token);

        setData(res.data.data);
        // setPage(res.data.page);
        setTotalPage(res.data.total_page);
      })
      .catch((err) => {
        return console.log(err);
      });
  }, [query, token]);

  const prevHandler = () => {
    const page = query.get("page");
    // setPage((prev) => Number(prev) - 1);
    history.push(`/home?page=${Number(page) - 1}`, { token });
  };
  const nextHandler = () => {
    const page = query.get("page");
    // setPage((prev) => Number(prev) + 1);
    history.push(`/home?page=${Number(page) + 1}`, { token });
  };

  return (
    <div>
      <h1>Home</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">Email</th>
            <th scope="col">Kota</th>
            <th scope="col">Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.city}</td>
              <td>
                <img
                  //   className={classes.image}
                  height={100}
                  width={100}
                  src={user.profile_picture}
                  alt=""
                />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={prevHandler}>
              Previous
            </button>
          </li>

          <li className="page-item">
            <button className="page-link" onClick={nextHandler}>
              Next
            </button>
          </li>
        </ul>
      </nav>
      <p>Total pages: {totalPage}</p>
    </div>
  );
}

export default Home;
