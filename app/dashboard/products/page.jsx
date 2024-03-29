import Image from "next/image"
import Link from "next/link"
import styles from '@/app/ui/dashboard/products/products.module.css'
import { fetchProducts } from "@/app/lib/data"
import { deleteProduct } from "@/app/lib/actions"

const ProductPage = async() => {

  const products = await fetchProducts();

  console.log(products)
  return (
    <div className={styles.container}>
      <div className={styles.top}>
          <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
          </Link>         
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Createt At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
       
          <tr>
            <td>
              <div className={styles.product}>
              <Image src="/avatar.png" height={40} width={40}/>
             {product.title}
              </div>
            </td>
            <td>{product.desc}</td>
            <td>${product.price}</td>
            <td>{product.cratedAt?.toString().slice(4,16)}</td>
            <td>{product.stock}</td>
            <td>
            <Link href={`/dashboard/products/${product.id}`}>
              <button className={`${styles.button} ${styles.view}`}>View</button>
              </Link>
              <form action={deleteProduct}>
                  <input type="hidden" name="id" value={product.id}/>
                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                </form>
            </td>
          </tr>

               
))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductPage
