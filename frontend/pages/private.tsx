import axios from "axios";
import { NextPage } from "next";
import { isTolkenExpired } from "../utils/auth";
import { parseCookies } from "../utils/cookies";
import { http } from "../utils/http";

interface PrivatePageProps {
  name: string;
}

export const PrivatePage: NextPage<PrivatePageProps> = (props) =>{
  return(
    <div>
      Pagina privada {props.name};
    </div>
  )
};

 
export default PrivatePage;

export const getServerSideProps: GetServerSideProps = async (ctx) =>{
  const cookies = parseCookies(ctx.req);
  // Se nao tem o cookie no tolken redirecionamos para a pagina de login ou se o tolken esta espirado tambem redirecionamos
  if (!cookies.token || isTolkenExpired(cookies.token)){
    return {
      redirect:{
        permanent:false,
        destination: './login'
      }
    }
  }
  const {data} = await http.get("test-auth-proteced", {
    headers:{
      Authorization: `Bearer ${cookies.token}`
    }
  });
 
  return {
    props: data,
  }
}