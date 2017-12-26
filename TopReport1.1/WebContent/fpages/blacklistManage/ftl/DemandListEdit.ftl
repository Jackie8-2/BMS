<#import "/templets/commonQuery/CommonQueryTagMacro.ftl" as CommonQueryMacro>
<#assign bean=JspTaglibs["/WEB-INF/struts-bean.tld"] />
<#assign op="${RequestParameters['op']?default('')}" />
<#assign info = Session["USER_SESSION_INFO"]>
<@CommonQueryMacro.page title="需求信息编辑">
    <@CommonQueryMacro.CommonQuery id="DemandListEdit" init="true"  submitMode="selected"  navigate="false">
<table align="center" width="100%">
    <tr>
        <td valign="top" colspan="2" >
			<@CommonQueryMacro.Interface id="intface" label="请输入查询条件" colNm=4  />
        </td>
    </tr>
    <tr>
        <td><@CommonQueryMacro.PagePilot id="ddresult" maxpagelink="9" showArrow="true"  pageCache="true"/></td>
    </tr>
    <tr>
        <td width="100%">
			<@CommonQueryMacro.GroupBox id="DemandListEditGuoup" label="选择需求信息" expand="true">
                <table frame=void width="100%">
                    <tr>
                        <td colspan="2">
							<@CommonQueryMacro.DataTable id="datatable1" paginationbar="btAdd,-,btDel"
                            fieldStr="select,opr,id,hourly_wage,demand_theme,rel_system_name,rel_system_team,"+
                            "dev_name,bank_start,dev_day,dev_quote_day,dev_confirm_day,confirm_no,"+
                            "customer_manager,cop_bank_principal,cop_bank_principal_phone,remarks"
                            width="100%" hasFrame="true"/><br/>
                        </td>
                    </tr>
                    <tr align="center" style="display:none">
                        <td><@CommonQueryMacro.Button id="btModify" /></td>
                        <td><@CommonQueryMacro.Button id="btDetail" /></td>
                    </tr>
                </table>
            </@CommonQueryMacro.GroupBox>
        </td>
    </tr>
</table>
    </@CommonQueryMacro.CommonQuery>

<script language="JavaScript">
    var op ="${op}";

    function initCallGetter_post(dataset) {
        DemandListEdit_dataset.setParameter("op", op);
    }

    //定位一行记录
    function locate(id) {
        var record = DemandListEdit_dataset.find([ "id" ], [ id ]);
        if (record) {
            DemandListEdit_dataset.setRecord(record);
        }
    }

    //系统刷新单元格
    function datatable1_opr_onRefresh(cell, value, record) {
        if (record) {
            var id = record.getValue("id");
            var select = record.getValue("select");
            var tempHtml = "<center>";
            //if(auditType == "1" || auditType == "2"){
            tempHtml += "<a href=\"JavaScript:openModifyWindow('" + id
                    + "')\">修改</a> ";
            //}
            cell.innerHTML = tempHtml + "</center>";
        } else {
            cell.innerHTML = "";
        }
    }
    function btCancel_onClickCheck(button) {
        //unloadPageWindows("partWin");
        //button.url = "/fpages/blacklistManage/ftl/InternationalBlacklist.ftl";
        flushCurrentPage();
    }
    //展示对比功能的js
    function datatable1_id_onRefresh(cell, value, record) {
        if (record) {
            var id = record.getValue("id");
            cell.innerHTML = "<a href=\"Javascript:showDetail('" + id + "')\">"
                    + value + "</a>";
        } else {
            cell.innerHTML = "";
        }
    }

    function showDetail(id) {
        //DemandListEdit_dataset.setParameter("blacklistid", id);
        //btDetail.click();
        window.location = "${contextPath}/fpages/blacklistManage/ftl/DemandlistDetail.ftl?op=detail&reType=edit&id="
                + id;
    }

    //修改功能
    function openModifyWindow(id) {
        DemandListEdit_dataset.setParameter("id", id);
        btModify.click();
    }

    function btDel_onClickCheck(button) {
        var record1 = DemandListEdit_dataset.getFirstRecord();
        DemandListEdit_dataset.setParameter("op", "delT");
        var chk = 0;
        var bizArr = new Array();
        while (record1) {
            var temp = record1.getValue("select");
            if (temp) {
                bizArr[chk] = record1.getValue("id");
                chk++;
            }
            record1 = record1.getNextRecord();
        }

        if (chk == 0) {
            alert("请至少选择一条记录！");
            return false;
        } else {
            if (!confirm("确定删除选中？")) {
                return false;
            }
        }
    }

    function btDel_postSubmit(button) {
        alert("删除成功");
        button.url = "#";
        flushCurrentPage();
    }

    function btAdd_onClick(button) {
        locate(id);
        DemandListEdit_dataset.insertRecord();
    }

    //刷新当前页
    function flushCurrentPage() {
        DemandListEdit_dataset
                .flushData(DemandListEdit_dataset.pageIndex);
    }
</script>
</@CommonQueryMacro.page>
