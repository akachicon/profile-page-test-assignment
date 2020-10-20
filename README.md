# Profile page test assignment

[Demo](https://profile-page-test-assignment.herokuapp.com/)

## Requirements 

- Technologies: Next.js/Material-ui.

- Validate name (russian only), email, and phone.

- After data submission send data to http://jsonplaceholder.typicode.com/posts.
  The network panel in browser devtools should not log the endpoint.
  
- After positive submission response save data to localStorage.

- Saved data should be initial data for the inputs on a future page load.

- Adaptive design including different modals for small and large screens.

## Build and run

The following command will build and start production server on port 3000:   
```
npm run deploy:local
``` 

## Implementation notes

In production ssr solution we tend not to store on the client the data that 
will be hydrated from the server. This is due to react expectations of the 
reconciliation process - it expects data to be equal. In this task though, for 
the purpose of better ux, we do not follow this rule (you can find more info 
about handling this in the source).
