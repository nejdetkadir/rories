// 401
const unauthorized = (toast, message=null) => {
  toast.error(message === null ? "You need to sign in or sign up before continuing." : message, {
    duration : 3000,
    position: "top-right"
  })
}

// 422 
const unprocessableEntity = (toast, errors=null) => {
  if (errors === null) {
    toast.error("Something went wrong.", {
      duration : 3000,
      position: "top-right"
    })
  } else {
    for (const [key, value] of Object.entries(errors)) {
      toast.error(`${key} ${value}`, { 
        position: "top-right", 
        duration : 3000
      });
    }
  }
}

// 404
const notFound = (toast, message=null) => {
  toast.error(message === null ? "Page not found." : message, {
    duration : 3000,
    position: "top-right"
  })
}

// success
const success = (toast, message) => {
  toast.success(message, {
    duration : 3000,
    position: "top-right"
  })
}

// error
const error = (toast, message) => {
  toast.error(message, {
    duration : 3000,
    position: "top-right"
  })
}

// authentication error handler
const authErrorHandler = (toast, response) => {
  if (response.status === 401) {
    unauthorized(toast, "Invalid email or password.")
  } else if (response.status === 422) {
    unprocessableEntity(toast, response.data)
  } else if (response.status === 404) {
    notFound(toast)
  }
}

module.exports = {authErrorHandler, unprocessableEntity, success, error}