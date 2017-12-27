package com.cibfintech.blacklist.bankblacklist.getter;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import com.cibfintech.blacklist.bankblacklist.service.DemandListService;
import com.huateng.common.err.Module;
import com.huateng.common.err.Rescode;
import com.huateng.commquery.result.Result;
import com.huateng.commquery.result.ResultMng;
import com.huateng.ebank.business.common.PageQueryResult;
import com.huateng.ebank.framework.report.common.ReportConstant;
import com.huateng.ebank.framework.web.commQuery.BaseGetter;
import com.huateng.exception.AppException;

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
        String id = getCommQueryServletRequest().getParameter("id");
        int pageSize = this.getResult().getPage().getEveryPage();
        int pageIndex = this.getResult().getPage().getCurrentPage();
        List<Object> list = new ArrayList<Object>();

        StringBuffer hql = new StringBuffer(" from NsDemandList bblt where 1=1 ");
        hql.append(" and bblt.is_del='0' ");
        if (StringUtils.isNotBlank(bank_name)) {
            hql.append(" and bblt.bank_name like ?");
            list.add("%" + bank_name.trim() + "%");
        }
        if (StringUtils.isNotBlank(demand_theme)) {
            hql.append(" and bblt.demand_theme like ?");
            list.add("%" + demand_theme.trim() + "%");
        }
        if (StringUtils.isNotBlank(rel_system_name)) {
            hql.append(" and bblt.rel_system_name like ?");
            list.add("%" + rel_system_name.trim() + "%");
        }
        if (StringUtils.isNotBlank(id)) {
            hql.append(" and bblt.id like ?");
            list.add("%" + id.trim() + "%");
        }
        PageQueryResult pqr = DemandListService.getInstance().pageQueryByHql(pageIndex, pageSize, hql.toString(), list);
        return pqr;

    }
}
