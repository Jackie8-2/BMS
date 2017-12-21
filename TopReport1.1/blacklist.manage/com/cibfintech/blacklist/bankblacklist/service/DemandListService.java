package com.cibfintech.blacklist.bankblacklist.service;
import java.util.HashMap;
import java.util.List;

import resource.bean.blacklist.NsDemandList;
import resource.bean.report.SysTaskInfo;
import resource.blacklist.dao.BlackListDAO;
import resource.blacklist.dao.BlackListDAOUtils;
import resource.dao.base.HQLDAO;

import com.huateng.ebank.business.common.PageQueryCondition;
import com.huateng.ebank.business.common.PageQueryResult;
import com.huateng.ebank.business.management.common.DAOUtils;
import com.huateng.ebank.framework.exceptions.CommonException;
import com.huateng.ebank.framework.util.ApplicationContextUtils;
import com.huateng.ebank.framework.util.ExceptionUtil;
public class DemandListService {

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

    public static DemandListService getInstance() {
        return (DemandListService) ApplicationContextUtils.getBean("DemandListService");
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

    public HashMap<String, NsDemandList> getDemandListByHql(String hql) throws CommonException {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        List list = rootDAO.queryByQL2List(hql);
        HashMap<String, NsDemandList> map = new HashMap<String, NsDemandList>();
        for (int i = 0; i < list.size(); i++) {
            NsDemandList bblt = (NsDemandList) list.get(i);
            // list.set(i, bblt);
            map.put(bblt.getId(), bblt);
        }
        return map;
    }

    public List<NsDemandList> getBlackListByHql(String hql) throws CommonException {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        List<NsDemandList> list = rootDAO.queryByQL2List(hql);
        return list;
    }

    /*
     * 查询
     *
     * @param paramgroupId 参数段编号
     */
    public List<NsDemandList> getAllBankBlacklist() throws CommonException {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        List<NsDemandList> list = rootDAO.queryByQL2List("1=1");
        for (int i = 0; i < list.size(); i++) {
            NsDemandList bblt = (NsDemandList) list.get(i);
            list.set(i, bblt);
        }
        return list;
    }

    /*
     * 删除实体
     *
     * @param biNationregion
     */
    public void removeEntity(NsDemandList bankBlacklist) {
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
    public void modOrAddEntity(NsDemandList bankBlacklist) {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        try {
            rootDAO.saveOrUpdate(bankBlacklist);
            System.out.println(this.getClass().getName() + " 已插入或更新");
        } catch (CommonException e) {
            System.out.println(this.getClass().getName() + " 插入或更新出错！ ");
            e.printStackTrace();
        }
    }

    public void addEntity(NsDemandList bankBlacklist) throws CommonException {
        BlackListDAO rootDAO = BlackListDAOUtils.getBlackListDAO();
        if (isExists(bankBlacklist.getId())) {
            ExceptionUtil.throwCommonException(" 需求重复");
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
            NsDemandList bankBlacklist = (NsDemandList) rootDAO.query(NsDemandList.class, id);
            if (bankBlacklist == null) {
                return false;
            }
        } catch (CommonException e) {
            System.out.println("判断实体是否重复出错");
        }
        return true;
    }

    public void modEntity(NsDemandList bankBlacklist) {
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
    public NsDemandList selectById(String id) {
        BlackListDAO rootdao = BlackListDAOUtils.getBlackListDAO();
        NsDemandList bankBlacklist = null;
        try {
            bankBlacklist = (NsDemandList) rootdao.query(NsDemandList.class, id);
        } catch (CommonException e) {
            e.printStackTrace();
        }
        return bankBlacklist;
    }

}
