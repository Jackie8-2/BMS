package com.cibfintech.blacklist.bankblacklist.service;

import com.huateng.ebank.business.common.PageQueryCondition;
import com.huateng.ebank.business.common.PageQueryResult;
import com.huateng.ebank.business.management.common.DAOUtils;
import com.huateng.ebank.framework.exceptions.CommonException;
import com.huateng.ebank.framework.util.ApplicationContextUtils;
import com.huateng.ebank.framework.util.ExceptionUtil;
import resource.bean.blacklist.NsDemandListApproveState;
import resource.bean.report.SysTaskInfo;
import resource.blacklist.dao.BlackListDAO;
import resource.blacklist.dao.BlackListDAOUtils;
import resource.dao.base.HQLDAO;

import java.util.List;

public class DemandListApproveStateService {
    public PageQueryResult list(int pageIndex, int pageSize, String hql) throws CommonException {
        PageQueryCondition queryCondition = new PageQueryCondition();
        queryCondition.setQueryString(hql);
        queryCondition.setPageIndex(pageIndex);
        queryCondition.setPageSize(pageSize);
        HQLDAO hqlDAO = DAOUtils.getHQLDAO();
        return hqlDAO.pageQueryByQL(queryCondition);
    }

    /*
     * 获取一个实例
     *
     * @param paramgroupId 参数段编号
     */

    public static DemandListApproveStateService getInstance() {
        return (DemandListApproveStateService) ApplicationContextUtils.getBean("DemandListApproveStateService");
    }

    @SuppressWarnings("unchecked")
    public PageQueryResult pageQueryByHql(int pageIndex, int pageSize, String hql, List list) {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        PageQueryResult pageQueryResult = null;
        PageQueryCondition queryCondition = new PageQueryCondition();

        try {
            queryCondition.setQueryString(hql);
            queryCondition.setPageIndex(pageIndex);
            queryCondition.setPageSize(pageSize);
            queryCondition.setObjArray(list.toArray());
            pageQueryResult = rootDAO.pageQueryByQL(queryCondition);
        } catch (CommonException e) {
            e.printStackTrace();
        }
        return pageQueryResult;
    }

    public List<NsDemandListApproveState> getDemandListApproveStateByHql(String hql) throws CommonException {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        List<NsDemandListApproveState> list = rootDAO.queryByQL2List(hql);
        for (int i = 0; i < list.size(); i++) {
            NsDemandListApproveState bblt = (NsDemandListApproveState) list.get(i);
            list.set(i, bblt);
        }
        return list;
    }

    /*
     * 查询
     *
     * @param paramgroupId 参数段编号
     */
    public List getAllDemandListApprove() throws CommonException {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        List list = rootDAO.queryByQL2List("1=1");
        for (int i = 0; i < list.size(); i++) {
            NsDemandListApproveState bblt = (NsDemandListApproveState) list.get(i);
            list.set(i, bblt);
        }
        return list;
    }

    /*
     * 删除实体
     *
     * @param biNationregion
     */
    public void removeEntity(NsDemandListApproveState bankBlacklist) {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        try {
            rootDAO.delete(bankBlacklist);
            System.out.println("已删除");
        } catch (CommonException e) {
            System.out.println("删除实体出错！ ");
            e.printStackTrace();
        }
    }

    /*
     * 插入或者更新实体
     *
     * @param biNationregion
     */
    public void modOrAddEntity(NsDemandListApproveState bankBlacklist) {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        try {
            rootDAO.saveOrUpdate(bankBlacklist);
            System.out.println(this.getClass().getName() + " 已插入或更新");
        } catch (CommonException e) {
            System.out.println(this.getClass().getName() + " 插入或更新出错！ ");
            e.printStackTrace();
        }
    }

    public void addEntity(NsDemandListApproveState bankBlacklist) throws CommonException {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        if (isExists(bankBlacklist.getId())) {
            ExceptionUtil.throwCommonException(" 名单重复");
        }
        try {
            rootDAO.save(bankBlacklist);
            System.out.println(this.getClass().getName() + " 已插入或更新实体");
        } catch (CommonException e) {
            System.out.println(this.getClass().getName() + " 插入或更新实体！ ");
        }
    }

    public boolean isExists(String id) {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        try {
            NsDemandListApproveState bankBlacklist = (NsDemandListApproveState) rootDAO.query(NsDemandListApproveState.class, id);
            if (bankBlacklist == null) {
                return false;
            }
        } catch (CommonException e) {
            System.out.println("判断实体是否重复出错");
        }
        return true;
    }

    public void modEntity(NsDemandListApproveState bankBlacklist) {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        try {
            rootDAO.update(bankBlacklist);
            System.out.println(this.getClass().getName() + " 已插入或更新实体");
        } catch (CommonException e) {
            System.out.println(this.getClass().getName() + " 插入或更新实体出错！ ");
            e.printStackTrace();
        }
    }

    public void addTosystaskinfo(SysTaskInfo systackinfo) {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        try {
            rootDAO.saveOrUpdate(systackinfo);
        } catch (CommonException e) {
            e.printStackTrace();
        }
    }

    // 通过id来获取实体类
    public NsDemandListApproveState selectById(String id) {
        BlackListDAO rootdao = BlackListDAOUtils.getBlackListDAO();
        NsDemandListApproveState bankBlacklist = null;
        try {
            bankBlacklist = (NsDemandListApproveState) rootdao.query(NsDemandListApproveState.class, id);
        } catch (CommonException e) {
            e.printStackTrace();
        }
        return bankBlacklist;
    }
}
