import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { BsChatSquareDots } from 'react-icons/bs';

function MainPage() {

    return (
      <Container
        className="d-flex justify-content-center align-items-center mt-5"
      >
        <Card className="p-4" style={{width: "95%"}}>
          <h1>PsikoLog</h1>
          <p>
            PsikoLog projesi, psikolojik destek almak isteyen hastaların ve psikologların bir araya gelmesini hedefleyen bir web sitesi olarak tasarlanmıştır. Bu platform sayesinde hastalar, kendilerine uygun bir psikolog seçebilirler ve randevu taleplerini kolayca yönetebilirler. Psikologlar ise daha fazla danışana ulaşabilirler ve randevu işlemlerini daha verimli bir şekilde yönetebilirler.
          </p>
          <h2>Projenin Amacı</h2>
          <p>
            PsikoLog, psikolojik destek almak isteyen hastalarla psikologları aynı platformda buluşturmayı ve randevu işlemlerini kolaylaştırmayı hedefler.
          </p>
          <h2>Projenin Hedefleri</h2>
          <ul>
            <li>Hastalar için birçok farklı psikolog arasından tercihlerini yapabilmeleri, randevu taleplerini kolayca oluşturabilmeleri ve psikologlar hakkında özel yorumlar yazarak diğer kullanıcılara yardımcı olabilmeleri hedeflenmektedir.</li>
            <li>Psikologlar için daha fazla danışana ulaşabilmeleri, randevuları kolayca yanıtlayabilmeleri, yazdıkları blog yazılarını paylaşabilecekleri bir profil sayfasına sahip olmaları hedeflenmektedir.</li>
          </ul>
          <h2>İletişim Bilgileri</h2>
          <p>
            Eğer herhangi bir sorunuz veya geri bildiriminiz varsa, aşağıdaki iletişim bilgileri üzerinden bize ulaşabilirsiniz:
          </p>
          <p>Email: info@psikolog.com</p>
        </Card>
      </Container>
    );
}

export default MainPage;
