import React from "react";
import {Link} from 'react-router-dom';
import FormatContent from "../utils/FormatContent";
import SharePointClient from "../utils/SharePointClient";

import {Dropdown} from "react-bootstrap";
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

export default function ActivityItemView(prop) {
  const [post, setPost] = React.useState([]);

	const conn = new SharePointClient(
		process.env.REACT_APP_SHAREPOINT_SUBDOMAIN,
		process.env.REACT_APP_SHAREPOINT_SITENAME,
		process.env.REACT_APP_SHAREPOINT_LISTNAME,
		process.env.REACT_APP_SHAREPOINT_LISTFULLNAME
	);
  const entryId = prop.ItemId || -1;

	function translateItemDetail(data){
    const DateString = (new Date(data.Date)).toLocaleDateString("en-CA");
    return {
      id: data.Id,
      title: data.Title || "(non-title)",
      //body: data.body,
      body: data.Body,
      date: data.Date,
			//author: "",
			author: data.author,
      dateLocale: DateString
    };
  }

  React.useEffect(() => {
    //conn.getItem(entryId)
    //  .then((response) => {
    //    setPost(translateItemDetail(response.data));
    //  });
		setPost(translateItemDetail(prop.Item));
  }, [entryId]);
  if(!post) return 'nopost';

  return (
		<div
			className='row'
		>
			<div className='col-5 text-muted'>
				{post.dateLocale}
			</div>
			<div className='col-6 text-muted'>
				{post.author}
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
					{post.title}
				</h2>
			</div>
			<div className='col-12'>
				<FormatContent>
					{post.body}
				</FormatContent>
			</div>
		</div>
  );
}
