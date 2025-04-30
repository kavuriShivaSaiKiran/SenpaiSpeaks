"use client"

import { useActionState, useState } from "react"
import { Input } from "./ui/input"
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import { formSchema } from "@/sanity/lib/validation"
import { z } from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createPitch } from "@/lib/actions"
 
const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [pitch, setPitch] = useState("")
  const router = useRouter()


  const handleFormSubmit = async(prevState:any, formData: FormData)=>{
    try{
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      }
      await formSchema.parseAsync(formValues)

      console.log("Form values", formValues)

      const result = await createPitch(prevState, formData, pitch);
      console.log(result)

      if(result.status === "SUCCESS"){
        toast("Success", {
          description: "Your blog has been submitted successfully",
        })
        router.push(`/startup/${result._id}`)
      }

      return result;

    } catch (error){
      if(error instanceof z.ZodError){
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>)

        toast("Form validation failed",{
          description: "Please check the form fields and try again",
        })

        return {...prevState, error: "Form validation failed", status: "ERROR"}
      }

      toast("Unexpected Error",{
        description: "An Unexpected Error occured",
      })

      return {...prevState, error: "An unexpected error occurred", status: "ERROR"}
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, 
    {error: "", status: "initial"})


  return (
    <form action={formAction} className='startup-form' >
      <div>
        <label htmlFor="title" className=" startup-form_label " >Title</label>
        <Input id="title" name="title" className=" startup-form_input "
         required placeholder="Blog Title" />

         {errors.title &&
          <p className=" startup_form_error " >{errors.title}</p>
         }
      </div>
      
      <div className="flex flex-col items-start" >
        <label htmlFor="description" className=" startup-form_label " >Description</label>
        <textarea id="description" name="description" className=" w-full startup-form_textarea "
         required placeholder="Blog description" />

         {errors.description &&
          <p className=" startup_form_error " >{errors.description}</p>
         }
      </div>
      
      <div>
        <label htmlFor="category" className=" startup-form_label " >Category</label>
        <Input id="category" name="category" className=" startup-form_input "
          required placeholder="Blog Category like (Action, Adventure, etc)" />

         {errors.category &&
          <p className=" startup_form_error " >{errors.category}</p>
         }
      </div>
      
      <div>
        <label htmlFor="link" className=" startup-form_label " >Image URL</label>
        <Input id="link" name="link" className=" startup-form_input "
         required placeholder="Blog Anime Image URL" />

         {errors.link &&
          <p className=" startup_form_error " >{errors.link}</p>
         }
      </div>
      
      <div data-color-mode="light" >
        <label htmlFor="Story" className=" startup-form_label  " >Blog Story</label>
        <MDEditor
          value={pitch}
          onChange={(value)=>setPitch(value as string)}
          id="details"
          preview="edit"
          height={300}
          style={{borderRadius: 14, overflow:"hidden", marginTop: 10}}
          textareaProps={{
            placeholder: "Tell me the context of the Anime you want to speak"
          }}
          previewOptions={{
            disallowedElements: ["style"]
          }}
         />

         {errors.details &&
          <p className=" startup_form_error " >{errors.details}</p>
         }
      </div>

      <Button type="submit" className=" startup-form_btn " disabled={isPending} >
        {isPending ? "Submitting..." : "Submit Your Blog"}
        <Send className=" size-6 ml-2 " />
      </Button>
      

    </form>
  )
}

export default StartupForm