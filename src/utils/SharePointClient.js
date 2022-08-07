import axios from "axios"

export default class SharePointClient {
  constructor(subdomain, siteName, listName, ListItemEntityTypeFullName){
    this.domain = `${subdomain}.sharepoint.com`;
    this.siteName = siteName;
    this.listName = listName;
    this.ListItemEntityTypeFullName = ListItemEntityTypeFullName;

    this.siteURL = `https://${subdomain}.sharepoint.com/sites/${this.siteName}/`;
    this.ContextInfoURI = `${this.siteURL}/_api/contextinfo`;
  }

  get getListURI(){
    return `${this.siteURL}/_api/web/lists/getByTitle('${this.listName}')/items`;
  }

  getItemURI(entryId){
    return `${this.getListURI}(${entryId})`;
  }

  async getList(){
    return axios.get(this.getListURI);
  }

  async getItem(entryId){
    return axios.get(this.getItemURI(entryId));
  }

  async putItem(entryId, data){
    return axios.post(this.ContextInfoURI, {})
      .then(response => {
        return axios.post(
          this.getItemURI(entryId),
          this.formatPostdata(data),
          {
            headers: {
              "Content-Type": "application/json;odata=verbose",
              "X-RequestDigest": response.data.FormDigestValue,
              "If-Match": "*",
              "X-HTTP-Method": "MERGE"
            }
          }
        );
      });
  }

  async postItem(data){
    return axios.post(this.ContextInfoURI, {})
      .then(response => {
        return axios.post(
          this.getListURI(),
          this.formatPostdata(data),
          {
            headers: {
              "Content-Type": "application/json;odata=verbose",
              "X-RequestDigest": response.data.FormDigestValue
            }
          }
        );
      });
  }

  formatPostdata(data){
    return {
      __metadata: {type: this.ListItemEntityTypeFullName},
      ...data
    };
  }
};

//   translateList(data){
//     return data.value.map(e => this.translateItemDetail(e));
//   }
//
//  translateItemDetail(data){
//    const DateString = (new Date(data.date)).toLocaleDateString("en-CA");
//    return {
//      id: data.Id,
//      title: (data.Title === "" || !data.Title)? "(non-title)" : data.Title,
//      body: data.body,
//      date: data.date,
//      dateLocale: DateString
//    };
//  }
