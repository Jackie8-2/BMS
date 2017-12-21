package com.cibfintech.blacklist.bankblacklist.getter;
import com.cibfintech.blacklist.bankblacklist.service.DemandListApproveStateService;
import com.cibfintech.blacklist.bankblacklist.service.DemandListService;
import com.cibfintech.view.pub.DemandListApproveStateView;
import com.huateng.common.err.Module;
import com.huateng.common.err.Rescode;
import com.huateng.commquery.result.Result;
import com.huateng.commquery.result.ResultMng;
import com.huateng.ebank.business.common.PageQueryResult;
import com.huateng.ebank.framework.report.common.ReportConstant;
import com.huateng.ebank.framework.web.commQuery.BaseGetter;
import com.huateng.exception.AppException;
import com.huateng.report.utils.ReportEnum;
import resource.bean.blacklist.NsDemandList;
import resource.bean.blacklist.NsDemandListApproveState;

import java.util.ArrayList;
import java.util.List;

public class DemandListApproveGetter extends BaseGetter{
    @Override
    public Result call() throws AppException {
        try {
            this.setValue2DataBus(ReportConstant.QUERY_LOG_BUSI_NAME, "需求信息审批");
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

        StringBuffer hql = new StringBuffer(" from NsDemandListApproveState po where 1=1");
        hql.append(" and po.approve_state='1' order by po.approve_passday desc");

        DemandListService service = DemandListService.getInstance();
        DemandListApproveStateService auditStateService = DemandListApproveStateService.getInstance();

        List<NsDemandListApproveState> auditStates = auditStateService.getDemandListApproveStateByHql(hql.toString());

        List<DemandListApproveStateView> auditStateViews = new ArrayList<DemandListApproveStateView>();
        for (NsDemandListApproveState auditState : auditStates) {
            DemandListApproveStateView view = new DemandListApproveStateView();
            NsDemandList blackList = service.selectById(auditState.getDemand_list_no());
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
