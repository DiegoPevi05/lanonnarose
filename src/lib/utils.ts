import {ClassValue,clsx} from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapInputData(data: any) {

  data.blogs      = mapBlogs(data.blogs);
  data.products   = mapProducts(data.products);
  data.webContent = mapWebContent(data.webContent);

  return data;
}

const mapBlogs  = (blogs:any) => {
  console.log(blogs)
  var blogsSpanish:any[] = [];
  var blogsEnglish:any[] = [];
  blogs.map((blog:any)=>{

    var blogItemEs:any = {
      id: blog.id,
      title: blog.title_es,
      subTitle: blog.subTitle_es,
      description: blog.description_es,
      images: [],
      isImportant: blog.isImportant === 1 ? true : false,
      BullletPoins: blog.bulletpoints_es,
      date: blog.created_at.split("T")[0]
    }
    var blogItemEn:any = {
      id: blog.id,
      title: blog.title_en,
      subTitle: blog.subTitle_en,
      description: blog.description_en,
      images : [],
      isImportant: blog.isImportant === 1 ? true : false,
      BullletPoins: blog.bulletpoints_en,
      date: blog.created_at.split("T")[0]
    }

    if(blog.image1 !== null){
      blogItemEs.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+blog.image1)
      blogItemEn.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+blog.image1)
    }
    if(blog.image2 !== null){
      blogItemEs.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+blog.image2)
      blogItemEn.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+blog.image2)
    }
    if(blog.image3 !== null){
      blogItemEs.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+blog.image3)
      blogItemEn.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+blog.image3)
    }
    if(blog.image4 !== null){
      blogItemEs.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+blog.image4)
      blogItemEn.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+blog.image4)
    }

    blogsSpanish.push(blogItemEs);

    blogsEnglish.push(blogItemEn)
  })

  blogs = [
    { language: 'es', content: blogsSpanish }, { language: 'en', content: blogsEnglish}
  ]
  return blogs; 
}

const mapProducts = (products:any) => {

  var catalogSpanish:any[] = [];
  var catalogEnglish:any[] = [];
  var SectionsEs:any[] = [];
  var SectionsEn:any[] = [];
  products.map((product:any)=>{
    //How to check if a property exist in array of objects
    if(catalogSpanish.find((itemCatEs) => itemCatEs.section == product.section_es)){
      catalogSpanish.find((itemCatEs) => itemCatEs.section == product.section_es).products.push({
        id: product.id,
        title: product.title_es,
        description: product.description_es,
        shortDescription:product.shortDescription_es,
        image: import.meta.env.VITE_BACKEND_URL_PUBLIC+product.imageUrl,
        isImportant: product.isImportant === 1 ? true : false
      });

    }else{
      catalogSpanish.push({
        section: product.section_es,
        products:[{
          id: product.id,
          title: product.title_es,
          description: product.description_es,
          shortDescription:product.shortDescription_es,
          image: import.meta.env.VITE_BACKEND_URL_PUBLIC+product.imageUrl,
          isImportant: product.isImportant === 1 ? true : false
        }]
      })
      SectionsEs.push(product.section_es);
    }

    if(catalogEnglish.find((itemCatEn) => itemCatEn.section == product.section_en)){
      catalogEnglish.find((itemCatEn) => itemCatEn.section == product.section_en).products.push({
        id:product.id,
        title: product.title_en,
        description: product.description_en,
        shortDescription:product.shortDescription_en,
        image: import.meta.env.VITE_BACKEND_URL_PUBLIC+product.imageUrl,
        isImportant: product.isImportant === 1 ? true : false
      });

    }else{
      catalogEnglish.push({
        section: product.section_en,
        products:[{
          id: product.id,
          title: product.title_en,
          description: product.description_en,
          shortDescription:product.shortDescription_en,
          image: import.meta.env.VITE_BACKEND_URL_PUBLIC+product.imageUrl,
          isImportant: product.isImportant === 1 ? true : false
        }]
      })
      SectionsEn.push(product.section_en);
    }

  })

  products = [
    { language: 'es', content: catalogSpanish, sections: SectionsEs }, { language: 'en', content: catalogEnglish, sections: SectionsEn}
  ]
  return products; 
}

const mapWebContent = (webContent:any) => {

  var webContentSpanish:any[] = []
  var webContentEnglish:any[] = []

  webContent.map((item:any) => {
       webContentSpanish.push({
          id: item.id,
          name: item.name,
          content: item.content_es,
       });
       webContentEnglish.push({
         id: item.id,
         name: item.name,
         content: item.content_en,
       });
  })

  webContent = [
    { language: 'es', content: webContentSpanish }, { language: 'en', content: webContentEnglish}
  ];

  return  webContent;
}
