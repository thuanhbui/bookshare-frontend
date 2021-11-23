import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "@components/header";
import { UserManagementTemplate } from "src/templates/admin/homepage";

const AdminHomePageBook = (props) => {
    const router = useRouter();
    const [param, setParam] = useState({ itemId: null });
    const [selectedCate, setSelectedCate] = useState("all");
  
    useEffect(() => {      
    }, [router.isReady]);
  
    return (
      <React.Fragment>
        <Header />
        <div style={{ height: 50 }}></div>
        <UserManagementTemplate/>
      </React.Fragment>
    );
  };
  
  export default AdminHomePageBook;