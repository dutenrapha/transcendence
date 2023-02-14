export default function PageWithJSbasedForm() {
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      user: event.target.user.value,
      pwd: event.target.pwd.value,
      full_name: event.target.full_name.value,
      email: event.target.email.value,
      avatar: event.target.avatar.value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/form'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(`Form Data: ${result.data}`)
  }
  return (
    // We pass the event to the handleSubmit() function on submit.
    <form onSubmit={handleSubmit}>
      <label htmlFor="user">User intra 42</label>
      <input type="text" id="user" name="user" required />

      <label htmlFor="pwd">Password</label>
      <input type="text" id="pwd" name="pwd" required />

      <label htmlFor="full_name">Full Name</label>
      <input type="text" id="full_name" name="full_name" required />

      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />

      <label htmlFor="avatar">Avatar</label>
      <input type="text" id="avatar" name="avatar" required />

      <button type="submit">Submit</button>
    </form>
  )
}

// user pwd full_name email avatar
