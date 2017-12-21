<#import "/templets/commonQuery/CommonQueryTagMacro.ftl" as CommonQueryMacro>
<#assign reType="${RequestParameters['reType']?default('')}" />
<@CommonQueryMacro.page title="需求信息管理">
    <@CommonQueryMacro.CommonQuery id="DemandListDetail" init="true" submitMode="all"  navigate="false">
	<table align="left" width="100%">
        <tr valign="top">
            <td valign="center">
  				<@CommonQueryMacro.Group id="group1" label="需求信息管理"
                fieldStr="id,bank_id,bank_name,bank_type,bank_start,hourly_wage,demand_theme,rel_system_name,rel_system_team,dev_name,dev_day,"+
                "dev_quote_day,dev_confirm_day,confirm_no,customer_manager,cop_bank_principal,cop_bank_principal_phone,status_cd,remarks"
                colNm=4/>
            </td>
        </tr>
        <tr align="center">
            <td valign="left">
                <left><@CommonQueryMacro.Button id= "btClose"/></left>
            </td>
        </tr>
    </table>
    </@CommonQueryMacro.CommonQuery>
 <script language="javascript">

     var reType = "${reType}";
     function btClose_onClick(button) {
         if (reType == "entry") {
             window.location = "${contextPath}/fpages/blacklistManage/ftl/DemandlistEntry.ftl";
         } else if (reType == "approve") {
             window.location = "${contextPath}/fpages/blacklistManage/ftl/DemandlistApprove.ftl";
         } else if (reType == "edit") {
             window.location = "${contextPath}/fpages/blacklistManage/ftl/DemandlistEdit.ftl";
         }
     }

 </script>

</@CommonQueryMacro.page>
