package com.cibfintech.blacklist.bankblacklist.getter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import resource.bean.blacklist.NsBankBLOperateLog;
import resource.bean.pub.RoleInfo;

import com.cibfintech.blacklist.bankblacklist.service.BankBlackListOperateLogService;
import com.cibfintech.blacklist.bankblacklist.service.BankBlackListService;
import com.cibfintech.blacklist.util.GenerateID;
import com.huateng.common.err.Module;
import com.huateng.common.err.Rescode;
import com.huateng.commquery.result.Result;
import com.huateng.commquery.result.ResultMng;
import com.huateng.ebank.business.common.GlobalInfo;
import com.huateng.ebank.business.common.PageQueryResult;
import com.huateng.ebank.business.common.SystemConstant;
import com.huateng.ebank.framework.exceptions.CommonException;
import com.huateng.ebank.framework.report.common.ReportConstant;
import com.huateng.ebank.framework.web.commQuery.BaseGetter;
import com.huateng.exception.AppException;
import com.huateng.service.pub.UserMgrService;

@SuppressWarnings("unchecked")
public class BankBlackListEntryGetter extends BaseGetter {
	/*
	 * 获取商行黑名单
	 * 
	 * @author huangcheng
	 */
	@Override
	public Result call() throws AppException {
		try {
			this.setValue2DataBus(ReportConstant.QUERY_LOG_BUSI_NAME, "商行黑名单管理查询");
			PageQueryResult pageResult = getData();
			ResultMng.fillResultByList(getCommonQueryBean(), getCommQueryServletRequest(), pageResult.getQueryResult(), getResult());
			result.setContent(pageResult.getQueryResult());
			result.getPage().setTotalPage(pageResult.getPageCount(getResult().getPage().getEveryPage()));
			result.init();
			return result;
		} catch (AppException appEx) {
			throw appEx;
		} catch (Exception ex) {
			throw new AppException(Module.SYSTEM_MODULE, Rescode.DEFAULT_RESCODE, ex.getMessage(), ex);
		}
	}

	protected PageQueryResult getData() throws Exception {
		String qClientName = getCommQueryServletRequest().getParameter("qClientName");
		String qCertificateType = getCommQueryServletRequest().getParameter("qCertificateType");
		String qCertificateNumber = getCommQueryServletRequest().getParameter("qCertificateNumber");
		String qBlacklistType = getCommQueryServletRequest().getParameter("qBlacklistType");
		String qApprove = getCommQueryServletRequest().getParameter("qApprove");
		int pageSize = this.getResult().getPage().getEveryPage();
		int pageIndex = this.getResult().getPage().getCurrentPage();

		GlobalInfo globalinfo = GlobalInfo.getCurrentInstance();
		List<RoleInfo> roleInfos = UserMgrService.getInstance().getUserRoles(globalinfo.getTlrno());
		boolean isSuperManager = false;
		for (RoleInfo roleInfo : roleInfos) {
			if (roleInfo.getRoleType().equals(SystemConstant.ROLE_TYPE_SYS_MNG)) {
				isSuperManager = true;
				break;
			}
		}

		StringBuffer hql = new StringBuffer(" from NsBankBlackList bblt where 1=1");
		StringBuffer message = new StringBuffer("国际黑名单的查询:");
		List<Object> list = new ArrayList<Object>();
		hql.append(" and bblt.del= ?");
		list.add("F");

		if (StringUtils.isNotBlank(qClientName)) {
			hql.append(" and bblt.clientName like ?");
			list.add("%" + qClientName.trim() + "%");
			message.append("qClientName=").append(qClientName);
		}
		if (StringUtils.isNotBlank(qCertificateType)) {
			hql.append(" and bblt.certificateType = ?");
			list.add(qCertificateType.trim());
			message.append("qClientName=").append(qClientName);
		}
		if (StringUtils.isNotBlank(qCertificateNumber)) {
			hql.append(" and bblt.certificateNumber like ?");
			list.add("%" + qCertificateNumber.trim() + "%");
			message.append("qCertificateNumber=").append(qCertificateNumber);
		}
		if (StringUtils.isNotBlank(qBlacklistType)) {
			hql.append(" and bblt.blacklistType like ?");
			list.add("%" + qBlacklistType.trim() + "%");
			message.append("qBlacklistType=").append(qBlacklistType);
		}
		if (!isSuperManager) {
			hql.append(" and bblt.bankCode = ?");
			list.add(globalinfo.getBrcode());
			message.append("bankCode=").append(globalinfo.getBrcode());
		}
		if (StringUtils.isNotBlank(qApprove)) {
			hql.append(" and bblt.approve = ?");
			list.add(qApprove.trim());
			message.append("qApprove=").append(qApprove);
		}
		// hql.append(" order by po.createDate desc");

		PageQueryResult pqr = BankBlackListService.getInstance().pageQueryByHql(pageIndex, pageSize, hql.toString(), list);
		recordOperateLog(globalinfo, pqr.getTotalCount(), message.toString());
		return pqr;
	}

	// 记录查询日志
	private void recordOperateLog(GlobalInfo globalinfo, int count, String message) {
		BankBlackListOperateLogService service = BankBlackListOperateLogService.getInstance();
		NsBankBLOperateLog bean = new NsBankBLOperateLog();
		bean.setBrcode(globalinfo.getBrcode());
		bean.setId(String.valueOf(GenerateID.getId()));
		bean.setQueryType("self");
		bean.setQueryRecordNumber(String.valueOf(count));
		bean.setTlrIP(globalinfo.getIp());
		bean.setTlrno(globalinfo.getTlrno());
		bean.setOperateType(SystemConstant.LOG_QUERY);
		bean.setMessage(message);
		bean.setCreateDate(new Date());
		try {
			service.addEntity(bean);
		} catch (CommonException e) {
			e.printStackTrace();
		}
	}
}