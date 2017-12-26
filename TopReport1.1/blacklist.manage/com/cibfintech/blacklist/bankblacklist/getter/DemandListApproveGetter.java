package com.cibfintech.blacklist.bankblacklist.getter;
import com.cibfintech.blacklist.bankblacklist.service.DemandListService;
import com.huateng.common.err.Module;
import com.huateng.common.err.Rescode;
import com.huateng.commquery.result.Result;
import com.huateng.commquery.result.ResultMng;
import com.huateng.ebank.business.common.PageQueryResult;
import com.huateng.ebank.framework.report.common.ReportConstant;
import com.huateng.ebank.framework.web.commQuery.BaseGetter;
import com.huateng.exception.AppException;
import org.apache.commons.lang.StringUtils;
import resource.bean.blacklist.NsDemandList;

import java.util.ArrayList;
import java.util.List;

public class DemandListApproveGetter extends BaseGetter {
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
        String bank_name = getCommQueryServletRequest().getParameter("bank_name");
        String status_cd = getCommQueryServletRequest().getParameter("status_cd");
        String rel_system_name = getCommQueryServletRequest().getParameter("rel_system_name");
        String id = getCommQueryServletRequest().getParameter("id");
        int pageSize = this.getResult().getPage().getEveryPage();
        int pageIndex = this.getResult().getPage().getCurrentPage();
        List<Object> list = new ArrayList<Object>();

        StringBuffer hql = new StringBuffer(" from NsDemandList bblt where bblt.is_del='0' ");
        if (StringUtils.isNotBlank(bank_name)) {
            hql.append(" and bblt.bank_name like '%").append(bank_name.trim()).append("%'");
            list.add(bank_name.trim());
        }
        if (StringUtils.isNotBlank(status_cd)) {
            hql.append(" and bblt.status_cd ='").append(status_cd.trim()).append("'");
            list.add(status_cd.trim());
        }
        if (StringUtils.isNotBlank(rel_system_name)) {
            hql.append(" and bblt.rel_system_name like '%").append(rel_system_name.trim()).append("%'");
            list.add(rel_system_name.trim());
        }
        if (StringUtils.isNotBlank(id)) {
            hql.append(" and bblt.id='").append(id.trim()).append("'");
            list.add(id.trim());
        }
        PageQueryResult pqr = DemandListService.getInstance().pageQueryByHql(pageIndex, pageSize, hql.toString(), list);
        return pqr;

    }
}
