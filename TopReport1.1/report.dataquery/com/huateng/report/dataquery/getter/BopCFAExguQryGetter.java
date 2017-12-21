package com.huateng.report.dataquery.getter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import resource.bean.report.BopCfaExguDs;
import resource.bean.report.BopExguTorDs;
import resource.report.dao.ROOTDAO;
import resource.report.dao.ROOTDAOUtils;

import com.huateng.common.err.Module;
import com.huateng.common.err.Rescode;
import com.huateng.commquery.result.Result;
import com.huateng.commquery.result.ResultMng;
import com.huateng.ebank.business.common.GlobalInfo;
import com.huateng.ebank.business.common.PageQueryCondition;
import com.huateng.ebank.business.common.PageQueryResult;
import com.huateng.ebank.framework.exceptions.CommonException;
import com.huateng.ebank.framework.report.common.ReportConstant;
import com.huateng.ebank.framework.web.commQuery.BaseGetter;
import com.huateng.exception.AppException;
import com.huateng.report.common.service.ReportCommonService;
import com.huateng.report.constants.TopReportConstants;

@SuppressWarnings("unchecked")
public class BopCFAExguQryGetter extends BaseGetter {
	/*
	 * 对外担保信息
	 * 
	 * @author huangcheng
	 */
	@Override
	public Result call() throws AppException {
		try {
			PageQueryResult pageResult = getData();
			ResultMng.fillResultByList(getCommonQueryBean(), getCommQueryServletRequest(), pageResult.getQueryResult(),
					getResult());
			result.setContent(pageResult.getQueryResult());
			result.getPage().setTotalPage(pageResult.getPageCount(getResult().getPage().getEveryPage()));
			result.init();
			this.setValue2DataBus(ReportConstant.QUERY_LOG_BUSI_NAME, "对外担保签约信息数据查询页面查询");
			return result;
		} catch (AppException appEx) {
			throw appEx;
		} catch (Exception ex) {
			throw new AppException(Module.SYSTEM_MODULE, Rescode.DEFAULT_RESCODE, ex.getMessage(), ex);
		}
	}

	private PageQueryResult getData() throws CommonException {

		Map paramMap = this.getCommQueryServletRequest().getParameterMap();
		int pageSize = this.getResult().getPage().getEveryPage();
		int pageIndex = this.getResult().getPage().getCurrentPage();
		ROOTDAO rootdao = ROOTDAOUtils.getROOTDAO();
		GlobalInfo gInfo = GlobalInfo.getCurrentInstance();

		PageQueryResult pageQueryResult = null;
		PageQueryCondition queryCondition = new PageQueryCondition();

		String hql = "select bds from BopCfaExguDs bds where 1=1 ";

		String qWorkDateStart = getCommQueryServletRequest().getParameter("qWorkDateStart");
		String qWorkDateEnd = getCommQueryServletRequest().getParameter("qWorkDateEnd");
		String qActiontype = getCommQueryServletRequest().getParameter("qActiontype");
		String qBrNo = getCommQueryServletRequest().getParameter("qBrNo");

		String qRecStatus = getCommQueryServletRequest().getParameter("qRecStatus");
		String qApproveStatus = getCommQueryServletRequest().getParameter("qApproveStatus");

		String qRepStatus = getCommQueryServletRequest().getParameter("qRepStatus");
		String qFiller2 = getCommQueryServletRequest().getParameter("qFiller2");

		if (StringUtils.isNotBlank(qWorkDateStart)) {
			hql += " and bds.workDate >='" + qWorkDateStart + "'";
		}
		if (StringUtils.isNotBlank(qWorkDateEnd)) {
			hql += " and bds.workDate <='" + qWorkDateEnd + "'";
		}
		if (StringUtils.isNotBlank(qActiontype)) {
			hql += " and bds.actiontype ='" + qActiontype + "'";
		}
		if (StringUtils.isNotBlank(qRecStatus)) {
			hql += " and bds.recStatus ='" + qRecStatus + "'";
		}
		if (StringUtils.isNotBlank(qApproveStatus)) {
			hql += " and bds.approveStatus ='" + qApproveStatus + "'";
		}
		if (StringUtils.isNotBlank(qRepStatus)) {
			hql += " and bds.repStatus ='" + qRepStatus + "'";
		}
		if (StringUtils.isNotBlank(qFiller2)) {
			hql += " and bds.filler2 like '%" + qFiller2 + "%'";
		}
		if (StringUtils.isNotBlank(qBrNo)) {
			hql += " and bds.brNo ='" + qBrNo + "'";
		}

		hql += " and bds.apptype='" + TopReportConstants.REPORT_APP_TYPE_CFA + "'";
		hql += " and bds.currentfile='" + TopReportConstants.REPORT_FILE_TYPE_CFA_BA + "'";
		hql += " order by bds.workDate,bds.approveStatus,bds.actiontype desc";
		queryCondition.setQueryString(hql);
		queryCondition.setPageIndex(pageIndex);
		queryCondition.setPageSize(pageSize);
		pageQueryResult = rootdao.pageQueryByQL(queryCondition);

		List resultList = pageQueryResult.getQueryResult();
		for (int i = 0; i < resultList.size(); i++) {
			Object[] obs = (Object[]) resultList.get(i);
			BopCfaExguDs bopCfaExguDs = (BopCfaExguDs) obs[0];
			ReportCommonService commservice = ReportCommonService.getInstance();
			bopCfaExguDs.setBeneficiary(commservice.getBopExguTorBen(bopCfaExguDs.getId()));
			bopCfaExguDs.setGuarantore(commservice.getBopExguTorGua(bopCfaExguDs.getId()));
			List<BopExguTorDs> exguTorList = new ArrayList<BopExguTorDs>();
			exguTorList = rootdao.queryByQL2List(" from BopExguTorDs model where model.recId='"
					+ bopCfaExguDs.getId().trim() + "' and torType = '03'");
			bopCfaExguDs.setGuappname(exguTorList.get(0).getTorName());
			bopCfaExguDs.setGuappcode(exguTorList.get(0).getTorCode());
			bopCfaExguDs.setGuappnamen(exguTorList.get(0).getTorEnname());
		}

		return pageQueryResult;
	}
}
