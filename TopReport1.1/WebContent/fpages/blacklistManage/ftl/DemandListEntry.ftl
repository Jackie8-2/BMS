<#import "/templets/commonQuery/CommonQueryTagMacro.ftl" as CommonQueryMacro>
<#assign bean=JspTaglibs["/WEB-INF/struts-bean.tld"] />
<@CommonQueryMacro.page title="需求信息查询">
    <@CommonQueryMacro.CommonQuery id="DemandListEntry" init="true"  submitMode="selected"  navigate="false">
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
			<@CommonQueryMacro.GroupBox id="DemandListEntryGuoup" label="选择需求信息" expand="true">
                <table frame=void width="100%">
                    <tr>
                        <td colspan="2">
							<@CommonQueryMacro.DataTable id="datatable1" paginationbar=""
                            fieldStr="id,bank_id,bank_name,bank_type,bank_start,hourly_wage,demand_theme,rel_system_name,rel_system_team,dev_name,dev_day,dev_quote_day,dev_confirm_day,confirm_no,customer_manager,cop_bank_principal,cop_bank_principal_phone,status_cd,remarks"
                            width="100%" hasFrame="true"/><br/>
                        </td>
                    </tr>
                    <tr align="center" style="display:none">
                        <td><@CommonQueryMacro.Button id="btDetail" /></td>
                    </tr>
                </table>
            </@CommonQueryMacro.GroupBox>
        </td>
    </tr>
</table>
    </@CommonQueryMacro.CommonQuery>

<script language="JavaScript">

    //function initCallGetter_post(dataset) {
    //}

    //定位一行记录
    function locate(id) {
        var record = DemandListEntry_dataset.find([ "id" ], [ id ]);
        if (record) {
            DemandListEntry_dataset.setRecord(record);
        }
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
        window.location = "${contextPath}/fpages/blacklistManage/ftl/DemandListDetail.ftl?op=detail&reType=entry&id="+id;
    }

    //刷新当前页
    function flushCurrentPage() {
        DemandListEntry_dataset
                .flushData(DemandListEntry_dataset.pageIndex);
    }

</script>
</@CommonQueryMacro.page>
