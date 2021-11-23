import { Header } from "@components/header";
import React, { useEffect, useState } from "react";
import { AccountTemplate } from "src/templates/account";

const AccountInfoPage = () => {
    return (
        <React.Fragment>
          <Header />
          <div style={{ height: 50 }}></div>
          <AccountTemplate/>
        </React.Fragment>
      );
}

export default AccountInfoPage;