package resource.bean.blacklist.base;

import resource.bean.blacklist.NsDemandList;

import java.io.Serializable;

public class BaseNsDemandList implements Serializable {
    private static final long serialVersionUID = 1L;
    private int hashCode = Integer.MIN_VALUE;
    private String id;
    private String bank_id;
    private String bank_name;
    private String bank_type;
    private String bank_start;
    private String hourly_wage;
    private String demand_theme;
    private String rel_system_name;
    private String rel_system_team;
    private String dev_name;
    private String dev_day;
    private String dev_quote_day;
    private String dev_confirm_day;
    private String confirm_no;
    private String customer_manager;
    private String cop_bank_principal;
    private String cop_bank_principal_phone;
    private String status_cd;
    private String remarks;

    public String getStatus_cd() {
        return status_cd;
    }

    public void setStatus_cd(String status_cd) {
        this.status_cd = status_cd;
    }



    public BaseNsDemandList(){}
    public void setId(String id) {
        this.id = id;
        this.hashCode = Integer.MIN_VALUE;
    }

    public String getId() {
        return id;
    }
    public BaseNsDemandList(String id){
        this.id = id;
    }
    public int hashCode() {
        if (Integer.MIN_VALUE == this.hashCode) {
            if (null == this.getId())
                return super.hashCode();
            else {
                String hashStr = this.getClass().getName() + ":" + this.getId().hashCode();
                this.hashCode = hashStr.hashCode();
            }
        }
        return this.hashCode;
    }
    public boolean equals(Object obj) {
        if (null == obj)
            return false;
        if (!(obj instanceof NsDemandList))
            return false;
        else {
            NsDemandList internationalBlackList = (NsDemandList) obj;
            if (null == this.getId() || null == internationalBlackList.getId())
                return false;
            else
                return (this.getId().equals(internationalBlackList.getId()));
        }
    }
    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public int getHashCode() {
        return hashCode;
    }

    public void setHashCode(int hashCode) {
        this.hashCode = hashCode;
    }

    public String getBank_id() {
        return bank_id;
    }

    public void setBank_id(String bank_id) {
        this.bank_id = bank_id;
    }

    public String getBank_name() {
        return bank_name;
    }

    public void setBank_name(String bank_name) {
        this.bank_name = bank_name;
    }

    public String getBank_type() {
        return bank_type;
    }

    public void setBank_type(String bank_type) {
        this.bank_type = bank_type;
    }

    public String getBank_start() {
        return bank_start;
    }

    public void setBank_start(String bank_start) {
        this.bank_start = bank_start;
    }

    public String getHourly_wage() {
        return hourly_wage;
    }

    public void setHourly_wage(String hourly_wage) {
        this.hourly_wage = hourly_wage;
    }

    public String getDemand_theme() {
        return demand_theme;
    }

    public void setDemand_theme(String demand_theme) {
        this.demand_theme = demand_theme;
    }

    public String getRel_system_name() {
        return rel_system_name;
    }

    public void setRel_system_name(String rel_system_name) {
        this.rel_system_name = rel_system_name;
    }

    public String getRel_system_team() {
        return rel_system_team;
    }

    public void setRel_system_team(String rel_system_team) {
        this.rel_system_team = rel_system_team;
    }

    public String getDev_name() {
        return dev_name;
    }

    public void setDev_name(String dev_name) {
        this.dev_name = dev_name;
    }

    public String getDev_day() {
        return dev_day;
    }

    public void setDev_day(String dev_day) {
        this.dev_day = dev_day;
    }

    public String getDev_quote_day() {
        return dev_quote_day;
    }

    public void setDev_quote_day(String dev_quote_day) {
        this.dev_quote_day = dev_quote_day;
    }

    public String getDev_confirm_day() {
        return dev_confirm_day;
    }

    public void setDev_confirm_day(String dev_confirm_day) {
        this.dev_confirm_day = dev_confirm_day;
    }

    public String getConfirm_no() {
        return confirm_no;
    }

    public void setConfirm_no(String confirm_no) {
        this.confirm_no = confirm_no;
    }

    public String getCustomer_manager() {
        return customer_manager;
    }

    public void setCustomer_manager(String customer_manager) {
        this.customer_manager = customer_manager;
    }

    public String getCop_bank_principal() {
        return cop_bank_principal;
    }

    public void setCop_bank_principal(String cop_bank_principal) {
        this.cop_bank_principal = cop_bank_principal;
    }

    public String getCop_bank_principal_phone() {
        return cop_bank_principal_phone;
    }

    public void setCop_bank_principal_phone(String cop_bank_principal_phone) {
        this.cop_bank_principal_phone = cop_bank_principal_phone;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }




}
