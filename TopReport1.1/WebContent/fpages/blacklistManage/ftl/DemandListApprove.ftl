<#import "/templets/commonQuery/CommonQueryTagMacro.ftl" as CommonQueryMacro>
<#assign bean=JspTaglibs["/WEB-INF/struts-bean.tld"] />
<#assign opType="${RequestParameters['opType']?default('')}" />
<#assign op="${RequestParameters['op']?default('')}" />
<#assign info = Session["USER_SESSION_INFO"]>
<@CommonQueryMacro.page title="需求信息审批">
    <@CommonQueryMacro.CommonQuery id="DemandListApprove" init="true"  submitMode="selected"  navigate="false">
<table align="center" width="100%">
    <tr>
        <td width="100%">
			<@CommonQueryMacro.GroupBox id="DemandListApproveGuoup" label="选择需求信息" expand="true">
                <table frame=void width="100%">
                    <tr>
                        <td colspan="2">
							<@CommonQueryMacro.DataTable id="datatable1" paginationbar=""
                            fieldStr="bank_id,bank_name,id,hourly_wage,rel_system_team,dev_confirm_day,confirm_no,status_cd,remarks"
                            width="100%" hasFrame="true"/><br/>
                        </td>
                    </tr>
                    <tr align="center" style="display:none">
                        <td><@CommonQueryMacro.Button id="btDetail" /></td>
                    </tr>
                    <tr align="center" >
                        <td><@CommonQueryMacro.Button id="btApprove" />
                            &nbsp;&nbsp;
						<@CommonQueryMacro.Button id="btCancelApprove" /></td>
                        &nbsp;&nbsp;
                    </tr>
                </table>
            </@CommonQueryMacro.GroupBox>
        </td>
    </tr>
</table>
    </@CommonQueryMacro.CommonQuery>

<script language="JavaScript">
    var op ="${op}";
    var opType ="${opType}";
    var currentTlrno = "${info.tlrNo}";
    var roleType = "${info.roleTypeList}";

    function initCallGetter_post(dataset) {
        DemandListApprove_dataset.setParameter("op", op);
    }

    //定位一行记录
    function locate(id) {
        var record = DemandListApprove_dataset.find([ "id" ], [ id ]);
        if (record) {
            DemandListApprove_dataset.setRecord(record);
        }
    }

    //展示对比功能的js
    function datatable1_blacklistid_onRefresh(cell, value, record) {
        if (record) {
            var id = record.getValue("id");
            cell.innerHTML = "<a href=\"Javascript:showDetail('" + id + "')\">" + value + "</a>";
        } else {
            cell.innerHTML = "";
        }
    }

    function showDetail(id) {
        //DemandListApprove_dataset.setParameter("blacklistid", id);
        //btDetail.click();
        window.location = "${contextPath}/fpages/blacklistManage/ftl/DemandlistDetail.ftl?op=detail&reType=approve&id="+id;
    }

    function btApprove_onClickCheck() {
        var record1 = DemandListApprove_dataset.getFirstRecord();
        DemandListApprove_dataset.setParameter("op", "approveT");
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
            if(!confirm("确定审批选中？")){
                return false;
            }
        }
    }

    function btApprove_postSubmit(button) {
        alert("审批操作成功。");
        button.url = "#";
        //刷新当前页
        flushCurrentPage();
    }


    function btCancelApprove_onClickCheck() {
        var record1 = DemandListApprove_dataset.getFirstRecord();
        DemandListApprove_dataset.setParameter("op", "approveF");
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
            if (!confirm("确定取消审批选中？")) {
                return false;
            }
        }
    }

    function btCancelApprove_postSubmit(button) {
        alert("取消审批操作成功。");
        button.url = "#";
        //刷新当前页
        flushCurrentPage();
    }

    //刷新当前页
    function flushCurrentPage() {
        DemandListApprove_dataset
                .flushData(DemandListApprove_dataset.pageIndex);
    }
</script>
</@CommonQueryMacro.page>
