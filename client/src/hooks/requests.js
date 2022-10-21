const ApiRoute = "/v1"

async function httpGetPlanets() {
  const planets = await fetch(`${ApiRoute}/planets`)
  return await planets.json()
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const launches = await fetch(`${ApiRoute}/launches`)
  return await launches.json()
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  const response = await fetch(`${ApiRoute}/launches`,{
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(launch)
  })
  // console.log("response" , response)
  let data = await response.json()
  // console.log("data" , data)
  if(response.status === 201){

    data.ok = true
  }else{
    data.ok = false
  }
  return data
}

async function httpAbortLaunch(id) {
  const response = await fetch(`${ApiRoute}/launches/${id}`,{
    method : "delete",
  })
  // console.log("response" , response)
  // let data = await response.json()
  // console.log("data" , data)
  // if(response.status === 204){

  //   response.ok = true
  // }else{
  //   response.ok = false
  // }
  return response
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};