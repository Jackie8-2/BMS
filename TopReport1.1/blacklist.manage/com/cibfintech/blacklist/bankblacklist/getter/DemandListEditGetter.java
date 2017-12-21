package com.cibfintech.blacklist.bankblacklist.getter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.huateng.report.utils.ReportEnum;
import org.apache.commons.lang.StringUtils;
import resource.bean.blacklist.NsDemandList;
import resource.bean.blacklist.NsDemandListApproveState;
import resource.bean.pub.RoleInfo;

import com.cibfintech.blacklist.bankblacklist.service.DemandListApproveStateService;
import com.cibfintech.blacklist.bankblacklist.service.DemandListService;
import com.cibfintech.view.pub.DemandListApproveStateView;
import com.huateng.common.err.Module;
import com.huateng.common.err.Rescode;
import com.huateng.commquery.result.Result;
import com.huateng.commquery.result.ResultMng;
import com.huateng.ebank.business.common.GlobalInfo;
import com.huateng.ebank.business.common.PageQueryResult;
import com.huateng.ebank.business.common.SystemConstant;
import com.huateng.ebank.framework.report.common.ReportConstant;
import com.huateng.ebank.framework.web.commQuery.BaseGetter;
import com.huateng.exception.AppException;
import com.huateng.service.pub.UserMgrService;

public class DemandListEditGetter extends BaseGetter{
    public Result call() throws AppException {
        try {
            this.setValue2DataBus(ReportConstant.QUERY_LOG_BUSI_NAME, "需求信息编辑");
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
        String bank_name = getCommQueryServletRequest().getParameter("bank_name");
        String demand_theme = getCommQueryServletRequest().getParameter("demand_theme");
        String rel_system_name = getCommQueryServletRequest().getParameter("rel_system_name");
        // int pageSize = this.getResult().getPage().getEveryPage();
        // int pageIndex = this.getResult().getPage().getCurrentPage();

        GlobalInfo globalinfo = GlobalInfo.getCurrentInstance();
        List<RoleInfo> roleInfos = UserMgrService.getInstance().getUserRoles(globalinfo.getTlrno());
        boolean isSuperManager = false;
        for (RoleInfo roleInfo : roleInfos) {
            if (roleInfo.getRoleType().equals(SystemConstant.ROLE_TYPE_SYS_MNG)) {
                isSuperManager = true;
                break;
            }
        }

        StringBuffer hql = new StringBuffer(" from NsDemandListApproveState po where ");
        hql.append(" and po.approve_state='").append(ReportEnum.DEMAND_APPROVE_STATE.APPROVING.value).append("')");
        if (!isSuperManager) {
            hql.append(" and po.brcode='").append(globalinfo.getBrcode()).append("'");
        }
        StringBuffer hql2 = new StringBuffer(" from NsDemandList bblt where 1=1");

        if (StringUtils.isNotBlank(bank_name)) {
            hql2.append(" and bblt.bank_name like '%").append(bank_name.trim()).append("%'");
        }
        if (StringUtils.isNotBlank(demand_theme)) {
            hql2.append(" and bblt.demand_theme = '").append(demand_theme.trim()).append("'");
        }
        if (StringUtils.isNotBlank(rel_system_name)) {
            hql2.append(" and bblt.rel_system_name like '%").append(rel_system_name.trim()).append("%'");
        }

        HashMap<String, NsDemandList> blacklistMap = DemandListService.getInstance().getDemandListByHql(hql2.toString());

        DemandListApproveStateService auditStateService = DemandListApproveStateService.getInstance();

        List<NsDemandListApproveState> auditStates = auditStateService.getDemandListApproveStateByHql(hql.toString());

        List<DemandListApproveStateView> auditStateViews = new ArrayList<DemandListApproveStateView>();

        for (NsDemandListApproveState auditState : auditStates) {
            DemandListApproveStateView view = new DemandListApproveStateView();

            NsDemandList blackList = blacklistMap.get(auditState.getDemand_list_no());
            if (null == blackList)
                break;
            view.setId(auditState.getId());
            view.setBrcode(auditState.getBrcode());
            view.setApprove_user_id((auditState.getApprove_user_id()));
            view.setApprove_state(auditState.getApprove_state());
            view.setBank_name(blackList.getBank_name());
            view.setConfirm_no(blackList.getConfirm_no());
            auditStateViews.add(view);
        }

        PageQueryResult pageQueryResult = new PageQueryResult();
        if (auditStateViews != null && auditStateViews.size() > 0) {
            pageQueryResult.setTotalCount(auditStateViews.size());
        } else {
            pageQueryResult.setTotalCount(0);
        }
        pageQueryResult.setQueryResult(auditStateViews);
        return pageQueryResult;
    }
}
