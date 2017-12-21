<#import "/templets/commonQuery/CommonQueryTagMacro.ftl" as CommonQueryMacro>
<#assign op=RequestParameters["op"]?default("")>
<@CommonQueryMacro.page title="需求信息编辑">
    <@CommonQueryMacro.CommonQuery id="DemandListManage" init="true">
<table align="center" width="100%">
    <tr>
        <td  align="left">
				<@CommonQueryMacro.Group id ="DemandListManageGroup" label="需求信息"
                fieldStr="bank_id,bank_name,id,hourly_wage,rel_system_team,dev_confirm_day,confirm_no,status_cd,remarks"
                colNm=4/>
        </td>
    </tr>
    <tr >
        <td  align="center">
	  		<@CommonQueryMacro.Button id="btSave" />
            &nbsp;&nbsp;&nbsp;&nbsp;
	  		<@CommonQueryMacro.Button id="btQueryVerify" />
            &nbsp;&nbsp;&nbsp;&nbsp;
			<@CommonQueryMacro.Button id="btCancel" />
        </td>
    </tr>
</table>
    </@CommonQueryMacro.CommonQuery>

<script language="JavaScript">
    alert("hahha  " + _t1.pageSize);
    alert("hehe " + _t1.pageIndex);

    function btSave_onClickCheck(button) {
        var id = DemandListManage_dataset.getValue("id");
        var demand_theme = DemandListManage_dataset.getValue("demand_theme");
        var bank_name = DemandListManage_dataset.getValue("bank_name");
        DemandListManage_dataset.setParameter("opSave", "save");

        if (bank_name == null || "" == bank_name) {
            alert("证件类型不能为空");
            return false;
        }
        if (demand_theme == null || "" == demand_theme) {
            alert("证件号不能为空");
            return false;
        }
        return true;
    }

    //保存后刷新当前页
    function btSave_postSubmit(button) {
        alert("保存成功。");
    }


    function btQueryVerify_onClickCheck(button) {
        var id = DemandListManage_dataset.getValue("id");
        var demand_name = DemandListManage_dataset.getValue("demand_name");
        var bank_name = DemandListManage_dataset.getValue("bank_name");
        DemandListManage_dataset.setParameter("opSave", "queryVerify");

        if (bank_name == null || "" == bank_name) {
            alert("证件类型不能为空");
            return false;
        }
        if (demand_name == null || "" == demand_name) {
            alert("证件号不能为空");
            return false;
        }
        return true;
    }

    //保存后刷新当前页
    function btQueryVerify_postSubmit(button) {
        alert("提交审核成功，请等待审核通过。");
    }

</script>
</@CommonQueryMacro.page>
