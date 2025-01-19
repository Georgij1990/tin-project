function GetData(url, setData, setError) {
  fetch(url)
  .then(res => {
    if (!res.ok) throw Error("error");
    return res.json()
  })
  .then(data => {
    setData(data)
  })
  .catch(err => {
    setError(err)
  })
}

export default GetData;