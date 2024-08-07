import React, { useState, useEffect } from "react"
import styled from "styled-components"
import parse, { domToReact } from "html-react-parser"
import CustomInput from "../components/Forms/CustomInput"
import CustomButton from "../components/Forms/CustomButton"
import Loader from "../components/Loader"

const Container = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`

export default function Home() {
  const [content, setContent] = useState({ head: "", body_attr: "", body: "" })
  const [loading, setLoading] = useState(false)
  const [formID, setformID] = useState(
    "kTPsJ%2BzeZKibmRzaXAQUkiZaKUfppJlc6XfeRwUTQh2GVt%2BFxLUfyX0Ksy59ezAcdrS%2BLf94SS"
  )

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          //get: ID=kTPsJ%2BzeZKibmRzaXAQUkiZaKUfppJlc6XfeRwUTQh2GVt%2BFxLUfyX0Ksy59ezAcdrS%2BLf94SS
          //post: ID=DR9Dhj7bIBnRQLVwCHh82NL9aPsJDvRrbOcZh24QU1yvGVABJlMZUm3ve%2BzFO09O9EJ%2Bez4GMeC8XOTDDl

          "/api/content-rendering?ID=" + formID
        )
        if (response.ok) {
          const data = await response.json()
          setContent(data)
        } else {
          console.error("Error fetching content")
        }
        setLoading(false)
      } catch (error) {
        console.error("Error:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Container>
      <h1>Parsed Selligent Form with Styled Components</h1>
      <p>Styled Components is cool</p>
      {loading ? (
        <Loader />
      ) : (
        <StyledSelligentForm html={content?.body} setContent={setContent} setLoading={setLoading} />
      )}
    </Container>
  )
}

const SelligentForm = ({ className, html, setContent, setLoading }) => {
  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()

    try {
      const formdata = new FormData(e.target)

      // Debug: Log all form data entries
      for (let [key, value] of formdata.entries()) {
        console.log(`${key}: ${value}`)
      }

      // Create an object to hold specific form data
      const data = {}
      formdata.forEach((value, key) => {
        // Exclude specific fields or process as needed
        data[key] = value
      })

      const response = await fetch(e?.target?.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      setContent(result)
      console.log(result)
      setLoading(false)
    } catch (error) {
      console.error("Error:", error)
      setLoading(false)
    }
  }

  const options = {
    replace: ({ name, attribs, children }) => {
      if (!attribs) {
        return
      }

      if (name === "input") {
        const { value, ...restAttribs } = attribs
        if (attribs.type === "submit") {
          return <CustomButton type="submit">{value}</CustomButton>
        } else {
          return <CustomInput defaultValue={value} {...restAttribs} />
        }
      }

      if (name === "form") {
        // Replace the form's method attribute
        return (
          <form
            method="post"
            action={attribs.action.replace(
              window?.location?.origin,
              "/api/content-rendering"
            )}
            onSubmit={handleSubmit}
          >
            {domToReact(children, options)}
          </form>
        )
      }
    },
  }
  return <div className={className}>{parse(html, options)}</div>
}

const StyledSelligentForm = styled(SelligentForm)`
  h1 {
    font-size: 1.5em;
    text-align: center;
  }
  label {
    color: #007bbd;
  }
`

/*const htmlFormJSON = {
  Body: '<form action="https://longtale.slgnt.eu/optiext/optiextension.dll?ID=mIEzpXz455OGhDoIunOkJ8VNdub4o9DiNuJQsZPVu7VGAblSNhlkOO7F8eKd%2BfA8I5Rl90HQptMsq6ymmy" method="post"><label for="fname">First name:</label><br><input type="text" id="fname" name="FNAME"><br><label for="lname">Last name:</label><br><input type="text" id="lname" name="LNAME"><br><br><input type="submit" value="Submit"></form> ',
  Head: "",
  Attributes: "",
}*/
