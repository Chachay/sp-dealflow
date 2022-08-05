import {
  //HashRouter,
  //Routes,
  //Route,
  Link
} from 'react-router-dom';
import './App.css';
import CompanyData from './company'
import React from 'react';
import {Button, Dropdown} from "react-bootstrap";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="."
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span className="threedots" />
  </a>
));

function App() {
  const dataList = CompanyData.companies;
  const index = 0;
  const index2 = 3;
  function formatDate(date){
    const event = new Date(date);
    return event.toLocaleDateString("en-US");
  }
  return (
    <div className="App container-fluid">
      <header>
        <nav className='navbar bg-light'>
          <a className="navbar-brand" href="/">Sharepoint - Dealflow App</a>
          <div className='col-3 text-right'>
            <span className="nav-item">
              <a className="nav-link inline" href="/edit">News Feed</a>
            </span>
            <span className="nav-item m-3">
              <a className="nav-link inline active" href="/edit">Explorer</a>
            </span>
          </div>
        </nav>
      </header>
      <main className='row'>
        <div className='col-2'>
          <div className='d-grid gap-2 d-md-flex justify-content-md-end mb-2'>
            <Button>Add</Button>
          </div>
          {
            dataList.map((v, i) => {
              return (
                <div
                  className={`row border-top ${i===index?"activeItem":""}`}
                  key={i}
                >
                  <div className="col">
                    <a href={`company/${v.Id}`}>
                      {v.Name}
                    </a>
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className='col-6'>
          <div
            className='row'
          >
            <div className='col-5'>
              <div className='col-12 mb-3'>
                <h2 className='h3'>
                  {dataList[index].Name}
                  <Dropdown className='h3 text-muted'>
                    <Dropdown.Toggle
                      as={CustomToggle}
                    />
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                      <Dropdown.Item eventKey="2">GetLink</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </h2>
              </div>
              <div className='col mb-3'>
                <a href={dataList[index].Url}>
                  Company Web
                </a>
              </div>
              <div className='col-12 mb-3'>
                {dataList[index].Description}
              </div>
            </div>
            <div className='col-7 px-5'>
              <div className='d-grid gap-2 d-md-flex justify-content-md-end mb-2'>
                <Button>Add</Button>
              </div>
              {
                dataList[index].Activity.map((v, i) => {
                  return (
                    <div
                      className={`row border-top ${i===index2?"activeItem":""}`}
                      key={i}
                    >
                      <div className="col-8">
                        {v.Title}
                      </div>
                      <div className="col-4">
                        {formatDate(v.Date)}
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
        <div
          className='col-4'
        >
          <div
            className='row'
          >
            <div className='col-5 text-muted'>
              {formatDate(dataList[index].Activity[index2].Date)}
            </div>
            <div className='col-6 text-muted'>
              {dataList[index].Activity[index2].author}
            </div>
            <div className='col-1 text-muted text-right'>
              <Dropdown className='h3 text-muted'>
                <Dropdown.Toggle
                  as={CustomToggle}
                />
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                  <Dropdown.Item eventKey="2">GetLink</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className='col-12'>
              <h2 className='h3 my-3'>
                {dataList[index].Activity[index2].Title}
              </h2>
            </div>
            <div className='col-12'>
              <p>{dataList[index].Activity[index2].Body}</p>
            </div>
          </div>
        </div>
      </main>
      <footer
        className="pt-3 my-4 border-top text-muted"
      >
        Sharepoint Dealflow App - Created by Chachay
      </footer>
    </div>
  );
}

export default App;
