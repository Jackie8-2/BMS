package resource.bean.blacklist;

import resource.bean.blacklist.base.BaseNsBankBlackList;

import java.io.Serializable;
import resource.bean.blacklist.base.BaseNsDemandList;
public class NsDemandList extends BaseNsDemandList implements Serializable{

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


        private static final long serialVersionUID = 1L;
        /* [CONSTRUCTOR MARKER BEGIN] */
        public NsDemandList() {
            super();
        }

        /**
         * Constructor for primary key
         */
        public NsDemandList(String id) {
            super(id);
        }

        /* [CONSTRUCTOR MARKER END] */

    }
