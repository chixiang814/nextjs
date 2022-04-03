export default function About(props) {
    console.log(props)
    return (
      <div>
        <p>This is about</p>
      </div>
    )
  }
  
  
  export async function getStaticProps(context) {
    // let data;
  
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/posts')
    const data = await res.json()
    
    return {
      props: {
              data
      }, // will be passed to the page component as props
    }
  }