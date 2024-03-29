"use server"

import { Products, Users } from "./models"

import bcrypt from "bcrypt"
import { connectToDB } from "./utils"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { signIn } from "@/auth"

export const addUser = async (formData) => {
    
    const {name,email,password,phone,address,isAdmin,isActive} = Object.fromEntries(formData);
    try{
        connectToDB();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser =  new Users({
            name,
            email,
            password:hashedPassword,
            phone,
            address,
            isAdmin,
            isActive
        })

        await newUser.save();
    }catch(err){
        console.log(err);
        throw new Error("Failed to create User")
    }

    redirect("/dashboard/users")
}

export const addProduct = async(formData) => {
    const {title,desc,price,stock,color,size} = Object.fromEntries(formData);

    try{
        connectToDB();

        const newProduct = new Products({
            title,
            desc,
            price,
            stock,
            color,
            size
        });

        await newProduct.save();
    } catch(err){
        console.log(err)
        throw new Error("Failed to create Product")
    }
}

export const deleteUser = async (formData) => {
    const {id} = Object.fromEntries(formData);

    try{
        connectToDB();
        await Users.findByIdAndDelete(id);
    }catch(err){
        console.log("Failed to delete");
    }

    revalidatePath("/dashboard/users")
}

export const deleteProduct = async (formData) => {
    const {id} = Object.fromEntries(formData);

    try{
        connectToDB();
        await Products.findByIdAndDelete(id);
    }catch(err){
        console.log("Failed to delete");
    }

    revalidatePath("/dashboard/products")
}

export const updateUser = async (formData) => {
    const { id, name, email, password, phone, address, isAdmin, isActive } =
      Object.fromEntries(formData);
  
    try {
      connectToDB();
  
      const updateFields = {
        name,
        email,
        password,
        phone,
        address,
        isAdmin,
        isActive,
      };
  
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );
  
      await Users.findByIdAndUpdate(id, updateFields);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update user!");
    }
  
    revalidatePath("/dashboard/users");
  };

//   export const authenticate = async (formData) => {
//     const { name, password } = Object.fromEntries(formData);

//     try {
//         await signIn("credentials", { name, password });
//     } catch (err) {
//         if (err.code === "credentials" || err.name === "CredentialsSignin") {
//             // Handle specific error related to wrong credentials
//             return "Wrong Credentials";
//         } else {
//             // Handle other errors by rethrowing them
//             throw err;
//         }
//     }
// }


  export const authenticate = async(formData) => {
    const {name,password} = Object.fromEntries(formData);

   const res =  await signIn("credentials", {name,password},{redirect:false});

   if(res?.ok){
    console.log("res",res);
    signIn("credentials", {name,password});
   } else {
    console.log("res",res);
    throw new Error("Failed to login")
   }
  }