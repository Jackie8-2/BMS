<#import "/templets/commonQuery/CommonQueryTagMacro.ftl" as CommonQueryMacro>
<@CommonQueryMacro.page title="国际黑名单管理">
<@CommonQueryMacro.CommonQuery id="InternationalBlackListDetail" init="true" submitMode="all"  navigate="false">
	<table align="left" width="100%">
      	<tr valign="top">
  			<td valign="center">
  				<@CommonQueryMacro.Group id="group1" label="国际黑名单管理详细信息" 
  					fieldStr="id,accountType,certificateType,certificateNumber,clientName,blacklistType,valid,validDate,lastModifyOperator" colNm=4/>
  			</td>
  		</tr>
  		<tr valign="top">
      		<td align="center">
				<left><@CommonQueryMacro.Button id= "btClose"/></left>
      		</td>
      	</tr>
</table>
</@CommonQueryMacro.CommonQuery>
 <script language="javascript">
</script>

</@CommonQueryMacro.page>
